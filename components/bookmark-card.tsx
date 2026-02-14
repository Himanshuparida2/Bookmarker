import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Trash2, ExternalLink, Globe } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { updateBookmarks } from "../src/app/bookmarks/backend/DataBaseFunctions";
import { useUser } from "../hooks/userContext";

interface Bookmark {
  id: string;      // unique ID for each bookmark (UUID recommended)
  title: string;   // title of the bookmark
  url: string;     // the link
  tags?: string[]; // optional
  createdAt?: string; // optional timestamp
}
interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const {bookmarks,setBookmarks,user}=useUser();
  const deleteBookmark  = (bookmark)=>{
    bookmarks.splice(bookmarks.findIndex(b => b.id === bookmark.id), 1);
    // Update the bookmarks in the database
    setBookmarks(bookmarks);
    updateBookmarks(user.email,bookmarks);
  }

  // Extract domain for favicon or display
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };

  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(bookmark.url)}`;

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-border/50 bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-muted/50 p-2 flex items-center justify-center overflow-hidden border border-border/50">
              <img 
                src={faviconUrl} 
                alt="Favicon" 
                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('fallback-icon');
                }}
              />
              <Globe className="w-5 h-5 text-muted-foreground hidden group-hover:block" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {bookmark.title}
              </h3>
              <p className="text-xs text-muted-foreground font-medium">
                {getDomain(bookmark.url)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/40">
          <span className="text-xs text-muted-foreground">
            {bookmark.createdAt && formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })}
          </span>

          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete bookmark?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove "{bookmark.title}" from your collection.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteBookmark(bookmark)}
                    className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={false}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient blob */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500 pointer-events-none" />
    </Card>
  );
}
