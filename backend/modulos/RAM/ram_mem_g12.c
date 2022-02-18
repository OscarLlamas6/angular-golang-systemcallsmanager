#include <linux/module.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <asm/uaccess.h>
#include <linux/hugetlb.h>

MODULE_DESCRIPTION("módulo que lee la RAM del sistema");
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Josselyn Polanco");
struct sysinfo info;
unsigned long cached;
unsigned long memorytotal;
double a;
unsigned long pages[NR_LRU_LISTS];
int lru;

static int Escribir_Archivo(struct seq_file *archivo, void *v)
{
    #define K(x) ((x) << (PAGE_SHIFT - 10))
        si_meminfo(&info);
        cached = global_node_page_state(NR_FILE_PAGES) -
                global_node_page_state(QC_SPACE) - info.bufferram;
        if (cached < 0)
            cached = 0;
        for (lru = LRU_BASE; lru < NR_LRU_LISTS; lru++)
            pages[lru] = global_node_page_state(NR_LRU_BASE + lru);
        seq_printf(archivo, "{");
        seq_printf(archivo, "\"total\":"); 
        seq_printf(archivo, "%ld",K(info.totalram));// memoria total
        seq_printf(archivo,",");
        seq_printf(archivo, "\"usada\":"); 
        seq_printf(archivo, "%ld", ((K(info.totalram) - (K(info.freeram) + K(info.bufferram) + K(cached))))); // memoria en uso
        seq_printf(archivo,",");
        seq_printf(archivo, "\"libre\":");
        seq_printf(archivo, "%ld", (K(info.freeram))); // memoria libre
        seq_printf(archivo,",");
        seq_printf(archivo, "\"cache\":");
        seq_printf(archivo, "%ld", (K(cached))); //caché
        seq_printf(archivo,",");
        seq_printf(archivo, "\"buffer\":");
        seq_printf(archivo, "%ld", (K(info.bufferram))); // buffer
        seq_printf(archivo,",");
        seq_printf(archivo, "\"porcentaje\":");
        seq_printf(archivo, "%ld", (((K(info.totalram) - (K(info.freeram) + K(info.bufferram) + K(cached))) * 100) / (K(info.totalram)))); //porcentaje de memoria en uso
        seq_printf(archivo,"}");
        
    #undef K
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
	proc_create("ram_mem_g12", 0, NULL, &operaciones);
	printk(KERN_INFO "***** Práctica 1 *****\n");
    printk(KERN_INFO "El grupo 12 ha instalado el monitor de memoria\n");
    
	return 0;
}

static void __exit remove(void)
{
	remove_proc_entry("ram_mem_g12", NULL);
	printk(KERN_INFO "***** Práctica 1 *****\n");
    printk(KERN_INFO "El grupo 12 ha removido el monitor del sistema\n");
}

module_init(insert);
module_exit(remove);

