import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

export default function OrderEmployee() {
  return (
    <>
      <CardHeader className="pb-2">
        <CardTitle>Employee</CardTitle>
        <CardDescription>Which employee completed the order?</CardDescription>
      </CardHeader>
      <CardContent>
        <Select name="employee">
          <SelectTrigger>
            <SelectValue placeholder="Select an employee" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Employees</SelectLabel>
              <SelectItem value="Employee1">Employee1</SelectItem>
              <SelectItem value="Employee2">Employee2</SelectItem>
              <SelectItem value="Employee3">Employee3</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter />
    </>
  );
}
