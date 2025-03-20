"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { UploadCloud, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { uploadImage } from "@/app/admin/actions"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function ImageUploader() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Limitar a 5 arquivos por vez
    const newFiles = acceptedFiles.slice(0, 5)
    setFiles((prev) => [...prev, ...newFiles].slice(0, 5))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/webp": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setProgress(0)

    try {
      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append("file", file)

        await uploadImage(formData)

        // Update progress
        setProgress(((i + 1) / files.length) * 100)
      }

      toast({
        title: "Upload concluído",
        description: `${files.length} ${files.length === 1 ? "imagem foi" : "imagens foram"} enviadas com sucesso.`,
      })

      // Clear files and refresh the page
      setFiles([])
      router.refresh()
    } catch (error) {
      console.error("Erro ao fazer upload:", error)
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar as imagens. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <p className="text-sm text-muted-foreground mb-1">Arraste e solte imagens aqui, ou clique para selecionar</p>
        <p className="text-xs text-muted-foreground">Suporta JPG, PNG, GIF e WebP até 5MB</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Arquivos selecionados ({files.length})</div>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                <div className="flex items-center space-x-2 truncate">
                  <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center overflow-hidden">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFile(index)} disabled={uploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {uploading ? (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">Enviando... {Math.round(progress)}%</p>
            </div>
          ) : (
            <Button onClick={handleUpload} className="w-full">
              Fazer Upload
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

