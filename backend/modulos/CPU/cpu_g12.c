#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <asm/uaccess.h>
#include <linux/hugetlb.h>
// PARA EL CPU
#include <linux/sched.h>
#include <linux/sched/signal.h>
#include <linux/mm.h>

MODULE_DESCRIPTION("módulo que lee la CPU del sistema");
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Josselyn Polanco");

struct task_struct *proceso,*procesoHijo;
struct list_head *hijos;
struct sysinfo info;
static int Escribir_Archivo(struct seq_file *archivo, void *v)
{
    long num_process=0;
    long num_process2=0;
    
    unsigned long rss;
    si_meminfo(&info);
    // recorre la lista de procesos
    seq_printf(archivo,"{\n\"procesos\":\n[\n");
    for_each_process(proceso){
        //obtengo el porcentaje
        num_process = num_process+1;
    }
    for_each_process(proceso){

        seq_printf(archivo,"{\n");
        //PID del proceso
        seq_printf(archivo,"\"pid\":%d,\n",proceso->pid);
        //nombre del proceso
        seq_printf(archivo,"\"nombre\":\"%s\",\n",proceso->comm);
        //uid del usuario 
        seq_printf(archivo,"\"user\":%d,\n",proceso->real_cred->uid);
        //estado
        seq_printf(archivo,"\"estado\":%ld\n",proceso->state);

        // CONDICIÓN PARA PODER OBTENER EL PORCENTAJE DE RAM UTILIZADO
        if (proceso->mm){
            rss = get_mm_rss(proceso->mm) << PAGE_SHIFT;
            //ram
            seq_printf(archivo,",\"ram\":%ld\n",rss);
            
        } 
        // obtengo los hijos de cada proceso (si tiene)
        seq_printf(archivo,",\"hijos\":[\n");
        long cantHijos = 0;
        long cantHijos2 = 0;
        list_for_each(hijos, &(proceso->children)){
            cantHijos = cantHijos+1;
        }
        list_for_each(hijos, &(proceso->children)){
            //empieza la sección del hijo
            procesoHijo = list_entry(hijos, struct task_struct,sibling);
            seq_printf(archivo,"{\n\"nombre\":\"%s\",\n",procesoHijo->comm);
            seq_printf(archivo,"\"pid\":%d\n}\n",procesoHijo->pid);
            cantHijos2 = cantHijos2 +1;
            if (cantHijos != cantHijos2){
                seq_printf(archivo,",");
            }
        }
        seq_printf(archivo,"]\n");
        
        num_process2 = num_process2+1;
        if(num_process2 != num_process){
            seq_printf(archivo,"},\n");
        }else{
            seq_printf(archivo,"}\n");
        }
    }
    seq_printf(archivo,"]\n");
    seq_printf(archivo,",\"total_procesos\":%ld",num_process);
    seq_printf(archivo,"\n}\n");
	return 0;
}

static int abrir(struct inode *inode, struct file *file)
{
	return single_open(file, Escribir_Archivo, NULL);
}

static const struct proc_ops operaciones = {
	.proc_open = abrir,
	.proc_read = seq_read,
	.proc_lseek = seq_lseek,
	.proc_release = single_release,
};

static int __init insert(void)
{
    
	printk(KERN_INFO "Cargando modulo.\r\n");
	proc_create("cpu_g12", 0, NULL, &operaciones);
	printk(KERN_INFO "***** Práctica 1 *****\n");
    printk(KERN_INFO "El grupo 12 ha instalado el CPU\n");
    
	return 0;
}

static void __exit remove(void)
{
	remove_proc_entry("cpu_g12", NULL);
	printk(KERN_INFO "***** Práctica 1 *****\n");
    printk(KERN_INFO "El grupo 12 ha removido el CPU\n");
}

module_init(insert);
module_exit(remove);

