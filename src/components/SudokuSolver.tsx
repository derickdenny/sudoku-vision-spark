import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { SudokuGrid } from './SudokuGrid';
import { ResultDisplay } from './ResultDisplay';
import { Card } from '@/components/ui/card';

interface SudokuData {
  originalGrid: (number | null)[][];
  solvedGrid: number[][];
  originalImage?: string;
  solvedImage?: string;
}

export const SudokuSolver = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sudokuData, setSudokuData] = useState<SudokuData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (imageFile: File) => {
    setIsProcessing(true);
    setError(null);
    
    // Convert to base64 for display
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(imageFile);

    // TODO: Replace with actual API call to your Python backend
    // Simulating processing for now
    setTimeout(() => {
      // Mock data - replace with actual API response
      const mockData: SudokuData = {
        originalGrid: [
          [5, 3, null, null, 7, null, null, null, null],
          [6, null, null, 1, 9, 5, null, null, null],
          [null, 9, 8, null, null, null, null, 6, null],
          [8, null, null, null, 6, null, null, null, 3],
          [4, null, null, 8, null, 3, null, null, 1],
          [7, null, null, null, 2, null, null, null, 6],
          [null, 6, null, null, null, null, 2, 8, null],
          [null, null, null, 4, 1, 9, null, null, 5],
          [null, null, null, null, 8, null, null, 7, 9],
        ],
        solvedGrid: [
          [5, 3, 4, 6, 7, 8, 9, 1, 2],
          [6, 7, 2, 1, 9, 5, 3, 4, 8],
          [1, 9, 8, 3, 4, 2, 5, 6, 7],
          [8, 5, 9, 7, 6, 1, 4, 2, 3],
          [4, 2, 6, 8, 5, 3, 7, 9, 1],
          [7, 1, 3, 9, 2, 4, 8, 5, 6],
          [9, 6, 1, 5, 3, 7, 2, 8, 4],
          [2, 8, 7, 4, 1, 9, 6, 3, 5],
          [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ],
      };
      setSudokuData(mockData);
      setIsProcessing(false);
    }, 3000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSudokuData(null);
    setError(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Sudoku Solver
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image of a Sudoku puzzle and watch our AI solve it instantly using 
            advanced computer vision and neural networks.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Upload & Original */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border shadow-card">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                Upload Sudoku Image
              </h2>
              <ImageUpload 
                onImageUpload={handleImageUpload}
                isProcessing={isProcessing}
                onReset={handleReset}
              />
              
              {uploadedImage && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3 text-foreground">
                    Original Image
                  </h3>
                  <div className="relative rounded-lg overflow-hidden shadow-soft">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded Sudoku" 
                      className="w-full h-auto max-h-96 object-contain bg-surface"
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-primary font-medium">Processing image...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Panel - Solution */}
          <div className="space-y-6">
            {sudokuData ? (
              <>
                <SudokuGrid 
                  originalGrid={sudokuData.originalGrid}
                  solvedGrid={sudokuData.solvedGrid}
                />
                <ResultDisplay sudokuData={sudokuData} />
              </>
            ) : (
              <Card className="p-12 bg-gradient-surface border-border shadow-card">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-tech flex items-center justify-center">
                    <div className="w-12 h-12 grid grid-cols-3 gap-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div 
                          key={i} 
                          className="w-3 h-3 bg-primary/30 rounded-sm"
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Awaiting Sudoku Image
                  </h3>
                  <p className="text-muted-foreground">
                    Upload an image to see the AI-powered solution appear here
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};