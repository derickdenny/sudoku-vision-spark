import { Card } from '@/components/ui/card';

interface SudokuGridProps {
  originalGrid: (number | null)[][];
  solvedGrid: number[][];
}

export const SudokuGrid = ({ originalGrid, solvedGrid }: SudokuGridProps) => {
  const isOriginalNumber = (row: number, col: number) => {
    return originalGrid[row][col] !== null;
  };

  const getCellValue = (row: number, col: number) => {
    return solvedGrid[row][col];
  };

  return (
    <Card className="p-6 bg-card border-border shadow-card">
      <h3 className="text-2xl font-semibold mb-6 text-foreground">
        AI Solution
      </h3>
      
      <div className="aspect-square max-w-md mx-auto">
        <div className="grid grid-cols-9 gap-0 border-4 border-border rounded-lg overflow-hidden bg-grid-background shadow-glow">
          {Array.from({ length: 9 }).map((_, row) =>
            Array.from({ length: 9 }).map((_, col) => {
              const isOriginal = isOriginalNumber(row, col);
              const value = getCellValue(row, col);
              const isThickRight = col === 2 || col === 5;
              const isThickBottom = row === 2 || row === 5;
              
              return (
                <div
                  key={`${row}-${col}`}
                  className={`
                    aspect-square flex items-center justify-center text-lg font-bold
                    transition-all duration-300 hover:bg-grid-hover
                    ${isThickRight ? 'border-r-4 border-r-grid-border' : 'border-r border-r-grid-border/50'}
                    ${isThickBottom ? 'border-b-4 border-b-grid-border' : 'border-b border-b-grid-border/50'}
                    ${isOriginal 
                      ? 'text-grid-original bg-primary/5' 
                      : 'text-grid-solution bg-secondary/5'
                    }
                  `}
                >
                  <span className={`
                    transition-all duration-500 transform
                    ${isOriginal 
                      ? 'font-extrabold text-xl scale-110' 
                      : 'font-semibold animate-pulse'
                    }
                  `}>
                    {value}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-8 mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span className="text-sm text-muted-foreground">Original Numbers</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-secondary rounded"></div>
          <span className="text-sm text-muted-foreground">AI Solution</span>
        </div>
      </div>
    </Card>
  );
};