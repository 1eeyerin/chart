interface ChartErrorProps {
  title: string;
  error?: Error | unknown;
  className?: string;
}

const ChartError = ({ title, error, className = "" }: ChartErrorProps) => {
  return (
    <div className={`text-center text-red-600 ${className}`}>
      <p>{title} 데이터를 불러오는 중 오류가 발생했습니다.</p>
      {error instanceof Error && error.message && (
        <p className="text-sm mt-2">{error.message}</p>
      )}
    </div>
  );
};

export default ChartError;
