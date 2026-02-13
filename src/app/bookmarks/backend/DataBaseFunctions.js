import { createClient } from "@supabase/supabase-js";

const Supa_URL = "https://wprwsiexkokqvlnwlxoq.supabase.co";
const Supa_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwcndzaWV4a29rcXZsbndseG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDMzNTUsImV4cCI6MjA4NjU3OTM1NX0.8RsGyMUBvhU0JO5TRoZknkgfsjd0WuqltFF8K508Olc";

export const supabase = createClient(
  Supa_URL,
  Supa_KEY
);

const fetchItm = async (email) => {
  try {
    const { data, error } = await supabase
      .from("Bookmarker")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw error;

    console.log(data);
    return data;

  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

  const updateBookmarks = async (email,bookmark) => {
    try {
      const { data, error } = await supabase
        .from("Bookmarker")
        .update({
          bookmarks: bookmark
        })
        .eq("email", email);
  
      if (error) throw error;
  
      console.log(data);
      return data;
  
    } catch (err) {
      console.error("Error updating data:", err);
    }
  }

  const deleteUser = async (email) => {
    try {
      const { data, error } = await supabase
        .from("Bookmarker")
        .delete()
        .eq("email", email);
  
      if (error) throw error;
  
      console.log(data);
      return data;
  
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  }

  const CreateUser = async (email,name,bookmark) => {
    try {
      const { data, error } = await supabase
        .from("Bookmarker")
        .upsert({
          email: email,
          name: name,
          bookmarks: bookmark
        });
  
      if (error) throw error;
  
      console.log(data);
      return data;
  
    } catch (err) {
      console.error("Error creating user:", err);
    }
  }
  export { fetchItm,updateBookmarks,deleteUser,CreateUser };