#include <linux/module.h>
#define INCLUDE_VERMAGIC
#include <linux/build-salt.h>
#include <linux/elfnote-lto.h>
#include <linux/vermagic.h>
#include <linux/compiler.h>

BUILD_SALT;
BUILD_LTO_INFO;

MODULE_INFO(vermagic, VERMAGIC_STRING);
MODULE_INFO(name, KBUILD_MODNAME);

__visible struct module __this_module
__section(".gnu.linkonce.this_module") = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};

#ifdef CONFIG_RETPOLINE
MODULE_INFO(retpoline, "Y");
#endif

static const struct modversion_info ____versions[]
__used __section("__versions") = {
	{ 0x8e6402a9, "module_layout" },
	{ 0xd7ed5de7, "single_release" },
	{ 0x91c1631c, "seq_lseek" },
	{ 0x8e596aa8, "seq_read" },
	{ 0xb75bc01, "remove_proc_entry" },
	{ 0xbe8b05f8, "proc_create" },
	{ 0xc5850110, "printk" },
	{ 0x9efa83dc, "init_task" },
	{ 0xad280409, "seq_printf" },
	{ 0x40c7247c, "si_meminfo" },
	{ 0xe53e512c, "single_open" },
	{ 0xbdfb6dbb, "__fentry__" },
};

MODULE_INFO(depends, "");


MODULE_INFO(srcversion, "AB1CC3D9DE37D373880E6A5");
