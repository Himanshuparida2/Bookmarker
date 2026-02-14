"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../hooks/userContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { z } from "zod";
import { updateBookmarks } from "../src/app/bookmarks/backend/DataBaseFunctions";

// Extend schema for client-side validation if needed, or use as is
const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
});
type FormValues = z.infer<typeof formSchema>;

export function CreateBookmarkDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const { user, bookmarks, setBookmarks } = useUser();
  function onSubmit(data: FormValues) {
    updateBookmarks(user.email, [...bookmarks, data])
      .then(() => {
        setBookmarks([...bookmarks, data]);
        form.reset();
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error saving bookmark:", error);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Add Bookmark
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl border-border/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">New Bookmark</DialogTitle>
          <DialogDescription>
            Add a new link to your collection.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="My Favorite Site" 
                      className="rounded-xl bg-muted/30 focus:bg-background transition-colors"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com" 
                      className="rounded-xl bg-muted/30 focus:bg-background transition-colors"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-2">
              <Button 
                type="submit" 
                disabled={false}
                className="rounded-xl w-full sm:w-auto"
              >
                {false ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Bookmark"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
