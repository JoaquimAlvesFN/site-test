"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getStorageUsage } from "@/app/admin/actions"

export function StorageUsage() {
  const [usage, setUsage] = useState<{
    totalSize: number;
    maxSize: number;
    usagePercentage: number;
    imageCount: number;
  } | null>(null);

  useEffect(() => {
    const fetchUsage = async () => {
      const data = await getStorageUsage();
      setUsage(data);
    };

    fetchUsage();
  }, []);

  if (!usage) {
    return null;
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uso de Armazenamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Espaço utilizado</span>
              <span>{formatSize(usage.totalSize)} de {formatSize(usage.maxSize)}</span>
            </div>
            <Progress value={usage.usagePercentage} className="h-2" />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Total de imagens: {usage.imageCount}</p>
            <p>Média por imagem: {formatSize(usage.totalSize / (usage.imageCount || 1))}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 