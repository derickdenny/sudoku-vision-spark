import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, X, Image } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isProcessing: boolean;
  onReset: () => void;
}

export const ImageUpload = ({ onImageUpload, isProcessing, onReset }: ImageUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      onImageUpload(file);
      toast({
        title: "Image uploaded successfully",
        description: "Processing your Sudoku puzzle...",
      });
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple: false,
    disabled: isProcessing
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 cursor-pointer
          ${isDragActive 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-border hover:border-primary/50 bg-surface'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <>
              <Upload className="w-12 h-12 mx-auto mb-4 text-primary animate-bounce" />
              <p className="text-lg font-medium text-primary">
                Drop your Sudoku image here
              </p>
            </>
          ) : (
            <>
              <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium text-foreground mb-2">
                Upload Sudoku Image
              </p>
              <p className="text-muted-foreground mb-4">
                Drag and drop your image here, or click to select
              </p>
              <Button 
                variant="secondary" 
                size="lg" 
                disabled={isProcessing}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                <Upload className="w-5 h-5 mr-2" />
                Choose File
              </Button>
            </>
          )}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          Supported formats: PNG, JPG, JPEG, WEBP (Max 10MB)
        </div>
      </div>

      {isProcessing && (
        <div className="flex items-center justify-between p-4 bg-gradient-tech rounded-lg border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium text-foreground">Processing your Sudoku...</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset}
            className="border-border hover:bg-surface"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};