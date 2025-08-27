import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { SudokuGrid } from './SudokuGrid';
import { Card } from '@/components/ui/card';

interface SudokuData {
  originalGrid: (number | null)[][];
  solvedGrid: number[][];
  originalImage?: string;
}

export const SudokuSolver = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sudokuData, setSudokuData] = useState<SudokuData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (imageFile: File) => {
    setIsProcessing(true);
    setError(null);
    setSudokuData(null);

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/solve_sudoku', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.solved_board || !data.original_board || !data.original_image) {
          throw new Error("Invalid data format from backend.");
      }

      setSudokuData({
        originalGrid: data.original_board,
        solvedGrid: data.solved_board,
        originalImage: `data:image/png;base64,${data.original_image}`,
      });

      setUploadedImage(`data:image/png;base64,${data.original_image}`);

    } catch (err) {
      console.error("Error solving Sudoku:", err);
      setError("Failed to solve Sudoku. Please try again with a clear image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setSudokuData(null);
    setError(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background flex justify-center items-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Sudoku Solver
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image of a Sudoku puzzle to see the solution.
          </p>
        </div>

        <Card className="p-6 bg-card border-border shadow-card">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Solve Sudoku
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
              <div className="relative rounded-lg overflow-hidden shadow-soft mb-6">
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

              {sudokuData && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-foreground">
                    Solved Sudoku
                  </h3>
                  <SudokuGrid
                    originalGrid={sudokuData.originalGrid}
                    solvedGrid={sudokuData.solvedGrid}
                  />
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-6 text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}

          {!uploadedImage && !isProcessing && (
            <div className="p-12 text-center bg-gradient-surface border-border shadow-card rounded-lg">
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
          )}
        </Card>
      </div>
    </div>
  );
};
