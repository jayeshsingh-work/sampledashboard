import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  className?: string;
}

export function FloatingActionButton({ className }: FloatingActionButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className={cn(
            "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50",
            className
          )}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mb-2">
        <DropdownMenuItem>Add New Asset</DropdownMenuItem>
        <DropdownMenuItem>Add Inventory Item</DropdownMenuItem>
        <DropdownMenuItem>Create Purchase Order</DropdownMenuItem>
        <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
        <DropdownMenuItem>Add Location</DropdownMenuItem>
        <DropdownMenuItem>Add Vendor</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}