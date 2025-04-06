export function getEnv(key: string): string {
    let value = process.env[key];
  
    if (!value) {
      throw new Error(`Environment variable ${key} is not set.`);
    }
    
    return value;
  }