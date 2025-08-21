import Card, { CardHeader, CardContent } from "../../ui/Card";
import { ReactNode } from "react";

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const ChartContainer = ({
  title,
  children,
  className = "",
}: ChartContainerProps) => {
  return (
    <Card className={`mb-6 ${className}`} padding="lg">
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ChartContainer;
