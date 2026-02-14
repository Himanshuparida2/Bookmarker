"use client";
import { useUser } from "../../../hooks/userContext";
import { useRealtime } from "../../../hooks/use-realtime";
import { BookmarkCard } from "../../../components/bookmark-card";
import { CreateBookmarkDialog } from "../../../components/create-bookmark-dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Search, LogOut, Bookmark, UserCircle } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

export default function Dashboard() {
  const {bookmarks,isLoading,user,Auth,setAuth} = useUser();
  const [search, setSearch] = useState("");

  // Enable real-time updates via WebSocket
  useRealtime();

  const filteredBookmarks = bookmarks?.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.url.toLowerCase().includes(search.toLowerCase())
  );
  const logout = () => {
    setAuth(false);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Bookmark className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg font-display tracking-tight hidden sm:inline-block">
              SmartBookmarks
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-full max-w-[200px] sm:max-w-xs hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookmarks..."
                className="pl-9 h-9 rounded-xl bg-muted/40 focus:bg-background transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.firstName || 'User'}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">My Bookmarks</h1>
            <p className="text-muted-foreground mt-1">
              Manage and organize your favorite links.
            </p>
          </div>
          <CreateBookmarkDialog />
        </div>

        {/* Mobile Search - Visible only on small screens */}
        <div className="mb-6 sm:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookmarks..."
              className="pl-9 rounded-xl bg-muted/40 focus:bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Bookmarks Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 rounded-2xl bg-muted/30 animate-pulse border border-border/40" />
            ))}
          </div>
        ) : filteredBookmarks?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border/50 rounded-3xl bg-muted/10">
            <div className="bg-muted p-4 rounded-full mb-4">
              <Bookmark className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No bookmarks found</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              {search 
                ? "No matches for your search. Try a different keyword." 
                : "You haven't saved any bookmarks yet. Add your first one to get started."}
            </p>
            {!search && <CreateBookmarkDialog />}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks?.map((bookmark) => (
              <div key={bookmark.id} className="animate-enter">
                <BookmarkCard bookmark={bookmark} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
