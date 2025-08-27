import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SudokuData {
  originalGrid: (number | null)[][];
  solvedGrid: number[][];
  originalImage?: string;
  solvedImage?: string;
}

interface ResultDisplayProps {
  sudokuData: SudokuData;
}

export const ResultDisplay = ({ sudokuData }: ResultDisplayProps) => {
  const handleDownload = () => {
    // TODO: Implement download functionality
    toast({
      title: "Download Started",
      description: "Your solved Sudoku is being prepared for download.",
    });
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    toast({
      title: "Share Link Copied",
      description: "Share link copied to clipboard!",
    });
  };

  const calculateStats = () => {
    let originalCount = 0;
    let solvedCount = 0;
    
    sudokuData.originalGrid.forEach(row => {
      row.forEach(cell => {
        if (cell !== null) originalCount++;
      });
    });
    
    solvedCount = 81 - originalCount;
    
    return { originalCount, solvedCount, difficulty: getDifficulty(originalCount) };
  };

  const getDifficulty = (filledCells: number) => {
    if (filledCells >= 50) return 'Easy';
    if (filledCells >= 36) return 'Medium';
    if (filledCells >= 26) return 'Hard';
    return 'Expert';
  };

  const stats = calculateStats();

  return (
    <Card className="p-6 bg-gradient-surface border-border shadow-card">
      <h3 className="text-xl font-semibold mb-4 text-foreground">
        Solution Complete!
      </h3>
      
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="text-2xl font-bold text-primary">{stats.originalCount}</div>
          <div className="text-xs text-muted-foreground">Given Numbers</div>
        </div>
        <div className="text-center p-3 bg-secondary/10 rounded-lg border border-secondary/20">
          <div className="text-2xl font-bold text-secondary">{stats.solvedCount}</div>
          <div className="text-xs text-muted-foreground">Solved Numbers</div>
        </div>
      </div>

      <div className="mb-6 p-3 bg-accent/10 rounded-lg border border-accent/20 text-center">
        <div className="text-lg font-semibold text-accent mb-1">
          Difficulty: {stats.difficulty}
        </div>
        <div className="text-sm text-muted-foreground">
          Based on initial clues provided
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={handleDownload}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Solution
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={handleShare}
            variant="outline"
            className="border-border hover:bg-surface"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button 
            variant="outline"
            className="border-border hover:bg-surface"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>

      {/* Processing Info */}
      <div className="mt-6 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          Solved using computer vision and neural networks
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Processing time: ~2.3 seconds
        </p>
      </div>
    </Card>
  );
};