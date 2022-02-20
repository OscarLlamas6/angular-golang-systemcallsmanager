# SO2_1S2022_P1_G12
### **STRACE**

##### Instalar:

```typescript
apt-get install libseccomp-dev pkg-config
go get github.com/seccomp/libseccomp-golang
go mod init [nombre del modulo golang]
Ejemplo go mod init strace
go mod tidy
go build .
    ./strace [comando a rastrear]
Ejemplo: ./strace echo test
```