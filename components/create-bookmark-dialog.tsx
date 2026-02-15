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


// ===== Schema =====

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Enter a valid URL"),
});

type FormValues = z.infer<typeof formSchema>;


// ===== Component =====

export function CreateBookmarkDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, bookmarks, setBookmarks } = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", url: "" },
  });

  // ===== Submit Handler =====

  const onSubmit = async (data: FormValues) => {
    if (!user?.email) {
      console.error("User not loaded");
      return;
    }

    try {
      setLoading(true);

      const newBookmarks = [...(bookmarks || []), data];

      await updateBookmarks(user.email, newBookmarks);

      // Functional update prevents stale state bugs
      setBookmarks((prev) => [...(prev || []), data]);

      form.reset();
      setOpen(false);

    } catch (error) {
      console.error("Error saving bookmark:", error);

    } finally {
      setLoading(false);
    }
  };

  // ===== UI =====

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger asChild>
        <Button className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Add Bookmark
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl border-border/50 shadow-2xl bg-white">

        <DialogHeader>
          <DialogTitle className="text-xl font-display">
            New Bookmark
          </DialogTitle>

          <DialogDescription>
            Add a new link to your collection.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* TITLE */}
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

            {/* URL */}
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

            {/* SUBMIT BUTTON */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="rounded-xl w-full sm:w-auto hover:cursor-pointer transition-all duration-300"
              >
                {loading ? (
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
