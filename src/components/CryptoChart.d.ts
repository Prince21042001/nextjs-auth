import { ReactNode } from 'react';

interface CryptoChartProps {
  symbol: string;
  interval?: string;
  count?: number;
  title?: string;
  height?: number;
  className?: string;
  showPrediction?: boolean;
}

declare function CryptoChart(props: CryptoChartProps): ReactNode;

export default CryptoChart; 