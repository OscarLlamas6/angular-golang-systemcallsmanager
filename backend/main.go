package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"syscall"
	"strings"

	"github.com/gin-gonic/gin"
)

type SystemCall struct {
    Id   uint64 `json:"id"`
    Name string `json:"name"`
}

type SystemCalls struct {
    Calls []SystemCall
}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func Saludo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"data": "Golang Gin - SO2 :D"})
}

func (obj *SystemCalls) AddItem(item SystemCall) {
    obj.Calls = append(obj.Calls, item)
}

func RAM(c *gin.Context) {
	cmd := exec.Command("sh", "-c", "cat /proc/ram_mem_g12")
	out, errorcito := cmd.CombinedOutput()
	if errorcito != nil {
		log.Print(errorcito)
		return
	}
	salida := string(out[:])
	var x map[string]interface{}
	json.Unmarshal([]byte(salida), &x)
	c.JSON(http.StatusOK, x)
}

func Procesos(c *gin.Context) {
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_g12")
	out, errorcito := cmd.CombinedOutput()
	if errorcito != nil {
		log.Print(errorcito)
		return
	}
	salida := string(out[:])
	var x map[string]interface{}
	json.Unmarshal([]byte(salida), &x)
	c.JSON(http.StatusOK, x)
}

func Usuarios(c *gin.Context) {
	decoder := json.NewDecoder(c.Request.Body)
	var params map[string]string
	decoder.Decode(&params)
	if len(params) != 0 {
		comando := "getent passwd " + params["user"] + " | cut -d: -f1"
		cmd := exec.Command("sh", "-c", comando)
		out, errorcito := cmd.CombinedOutput()
		if errorcito != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"values": "false",
			})
			return
		}
		salida := string(out[:])
		salida = strings.Replace(salida, "\n", "", 2)

		c.JSON(http.StatusOK, gin.H{
			"values": salida,
		})
	}
}

func Kill(c *gin.Context) {

	decoder := json.NewDecoder(c.Request.Body)
	var params map[string]string
	decoder.Decode(&params)

	if len(params) != 0 {
		comando := "echo admin | sudo -S kill " + params["pid"]
		cmd := exec.Command("sh", "-c", comando)
		out, errorcito := cmd.CombinedOutput()
		if errorcito != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"ok": "false",
			})
			return
		}
		fmt.Println(string(out[:]))
		c.JSON(http.StatusOK, gin.H{
			"values": "true",
		})
	}
}

func CPU(c *gin.Context) {
	cmd := exec.Command("sh", "-c", "top -bn 1 -i -c | head -n 3 | tail -1 | awk {'print $8'}")
	out, errorcito := cmd.CombinedOutput()
	if errorcito != nil {
		fmt.Println(errorcito)
		c.JSON(http.StatusBadRequest, gin.H{
			"total": "false",
		})
		return
	}
	salida := string(out[:])
	salida = strings.Replace(salida, "\n", "", 2)
	c.JSON(http.StatusOK, gin.H{
		"total": salida,
	})
}

func response(c *gin.Context, summary []SysCall, system_calls []SystemCall) {
    c.JSON(http.StatusOK, gin.H{
        "summary": summary,
        "system_calls": system_calls,
    })
}

func Strace(c *gin.Context) {
	decoder := json.NewDecoder(c.Request.Body)
	var params map[string]string
	decoder.Decode(&params)
    default_syscalls := []SysCalls
    default_systemcalls := []SystemCalls

	if len(params) != 0 {
        var err error
        var regs syscall.PtraceRegs
        var ss syscallCounter
        ss = ss.init()

        cmd := exec.Command("bash", "-c", params["process_name"])
        cmd.Stderr = os.Stderr
        cmd.Stdout = os.Stdout
        cmd.Stdin = os.Stdin
        cmd.SysProcAttr = &syscall.SysProcAttr{
            Ptrace: true,
        }

        cmd.Start()
        err = cmd.Wait()
        if err != nil {
            fmt.Printf("Wait err %v \n", err)
            response(c, default_syscalls.Syscall , default_systemcalls.SystemCall)
        }

    	var pid = cmd.Process.Pid
    	exit := true
        obj := SystemCalls{}
    	for {
    		if exit {
    			err = syscall.PtraceGetRegs(pid, &regs)
    			if err != nil {
    				break
    			}

    			obj_system_call := SystemCall{
                    Id:  regs.Orig_rax,
                    Name: ss.getName(regs.Orig_rax),
                }
                obj.AddItem(obj_system_call)
                ss.inc(regs.Orig_rax)
    		}

    		err = syscall.PtraceSyscall(pid, 0)
    		if err != nil {
    			panic(err)
    			response(c, default_syscalls.Syscall , default_systemcalls.SystemCall)
    		}

    		_, err = syscall.Wait4(pid, nil, 0, nil)
    		if err != nil {
    			panic(err)
    			response(c, default_syscalls.Syscall , default_systemcalls.SystemCall)
    		}

    		exit = !exit
    	}

        response(c, ss.getSummary(), obj.Calls)
    }
}

func main() {

	// Se crea el servidor con GIN
	r := gin.Default()

	// Se aplican middlewares
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(CORSMiddleware())

	// Especificando Rutas
	r.GET("/", Saludo)

	api := r.Group("/api")
	{
		api.GET("/ram", RAM)
		api.GET("/procesos", Procesos)
		api.POST("/strace", Strace)
		api.POST("/user", Usuarios)
		api.POST("/kill", Kill)
		api.GET("/cpu", CPU)
	}

	// Se inicia el servidor en el puerto 3000
	r.Run(":3000")
}
