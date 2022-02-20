package main

import (
	"fmt"

	sec "github.com/seccomp/libseccomp-golang"
)

type syscallCounter []int

const maxSyscalls = 303

type SysCall struct {
    Count int `json:"count"`
    Name string `json:"name"`
}

type SysCalls struct {
    Calls []SysCall
}

func (obj *SysCalls) AddItem(item SysCall) {
    obj.Calls = append(obj.Calls, item)
}

func (s syscallCounter) init() syscallCounter {
	s = make(syscallCounter, maxSyscalls)
	return s
}

func (s syscallCounter) inc(syscallID uint64) error {
	if syscallID > maxSyscalls {
		return fmt.Errorf("invalid syscall ID (%x)", syscallID)
	}

	s[syscallID]++
	return nil
}

func (s syscallCounter) getSummary() []SysCall {
    obj := SysCalls{}
	for k, v := range s {
		if v > 0 {
			name, _ := sec.ScmpSyscall(k).GetName()

            obj_system_call := SysCall{
                 Count:  v,
                 Name: name,
             }

             obj.AddItem(obj_system_call)
		}
	}

	return obj.Calls
}

func (s syscallCounter) getName(syscallID uint64) string {
	name, _ := sec.ScmpSyscall(syscallID).GetName()
	return name
}
