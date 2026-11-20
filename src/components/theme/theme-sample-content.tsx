import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ThemeSampleContentProps {
  title: string;
  description: string;
}

export function ThemeSampleContent({ title, description }: ThemeSampleContentProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="font-heading text-2xl font-medium">{title}</CardTitle>
          <Badge>New edit</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="block space-y-2 text-sm font-medium">
          Sample form field
          <Input aria-label="Sample form field" placeholder="Enter a value" />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button type="button">Primary button</Button>
          <Button type="button" variant="secondary">
            Secondary button
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
