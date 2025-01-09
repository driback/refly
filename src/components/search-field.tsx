import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { Input } from "./ui/input";

const SearchField = () => {
  return (
    <Form action="/" className="w-full">
      <div className="relative isolate w-full">
        <SearchIcon className="-translate-y-1/2 absolute top-1/2 left-2 size-4 opacity-80" />
        <Input
          type="text"
          name="q"
          placeholder="Find bookmark"
          className="max-h-8 w-full pl-8"
        />
      </div>
    </Form>
  );
};

export default SearchField;
