"use client";

import { useUser } from "../../../hooks/userContext";
import { BookmarkCard } from "../../../components/bookmark-card";
import { CreateBookmarkDialog } from "../../../components/create-bookmark-dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Search, LogOut, Bookmark, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { broadcastBookmarks } from "../../../Broadcast/broadcast";

export default function Dashboard() {
  const router = useRouter();

  const {
    bookmarks,
    setBookmarks,
    isLoading,
    setIsLoading,
    user,
    setUser,
    Auth,
    setAuth,
  } = useUser();

  const [search, setSearch] = useState("");

  const filteredBookmarks =
    search.length === 0
      ? bookmarks
      : bookmarks?.filter(
          (b) =>
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.url.toLowerCase().includes(search.toLowerCase())
        );

  useEffect(() => {
    if (!Auth) {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        router.push("/login");
        return;
      }
    }

    if (Auth && user?.bookmarks) {
      setBookmarks(user.bookmarks);
      setIsLoading(false);
    }
  }, [Auth, user, router, setBookmarks, setIsLoading]);

  useEffect(() => {
    const channel = new BroadcastChannel("bookmarks_channel");

    channel.onmessage = (event) => {
      if (event.data?.type === "BOOKMARKS_UPDATED") {
        setBookmarks(event.data.bookmarks);
      }
    };

    return () => {
      channel.close();
    };
  }, [setBookmarks]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuth(false);
    window.location.href = "/login";
    broadcastBookmarks([]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">

          <div className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Bookmark className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">
              SmartBookmarks
            </span>
          </div>

          <div className="flex items-center space-x-4">

            <div className="relative hidden sm:block max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookmarks..."
                className="pl-9 h-9 rounded-xl bg-muted/40"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-white" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logout}
                  className="text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">

        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Bookmarks</h1>
            <p className="text-muted-foreground">
              Manage and organize your favorite links.
            </p>
          </div>

          <CreateBookmarkDialog />
        </div>

        {filteredBookmarks?.length === 0 ? (

          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl">

            <div className="bg-muted p-4 rounded-full mb-4">
              <Bookmark className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="text-lg font-semibold mb-2">
              No bookmarks found
            </h3>

            <p className="text-muted-foreground max-w-sm mb-6">
              {search
                ? "No matches for your search."
                : "You haven't saved any bookmarks yet."}
            </p>

            {!search && <CreateBookmarkDialog />}

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map((bookmark) => (
              <div key={bookmark.id || bookmark.url}>
                <BookmarkCard bookmark={bookmark} />
              </div>
            ))}
          </div>

        )}

      </main>
    </div>
  );
}
