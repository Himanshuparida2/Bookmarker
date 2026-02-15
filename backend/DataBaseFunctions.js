import { createClient } from "@supabase/supabase-js";
import { set } from "date-fns";

const Supa_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const Supa_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!Supa_URL || !Supa_KEY) {
  throw new Error("Supabase URL or Key is not defined in environment variables.");
}

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

    //console.log(data);
    return data;

  } catch (err) {
    console.log("Error fetching data:", err);
  }
};

const updateBookmarks = async (email, bookmark) => {
  try {
    const { data, error } = await supabase
      .from("Bookmarker")
      .update({ bookmarks: bookmark })
      .eq("email", email)
      .select();

    if (error) throw error;

    console.log("Updated:", data);
    return data;

  } catch (err) {
    console.error("Error updating data:", err);
  }
};


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

  const checkUserExists = async (email) => {
    try {
      const { data, error } = await supabase
        .from("Bookmarker")
        .select("email")
        .eq("email", email)
        .single();
  
      if (error && error.code !== "PGRST116") throw error;
  
      return !!data;
  
    } catch (err) {
      console.error("Error checking user:", err);
      return false;
    }
  };

  const CreateUser = async (email,name) => {
    if(await checkUserExists(email)) {
      console.log("User already exists");
      return fetchItm(email);
    }
    try {
      const { data, error } = await supabase
        .from("Bookmarker")
        .insert({
          email: email,
          name: name,
          bookmarks: []
        });
  
      if (error){
        console.log("Error creating user:", error);
        throw error;
      }
      
      console.log(data);
      return data;
  
    } catch (err) {
      console.error("Error creating user:", err);
    }
  }
  export { fetchItm,updateBookmarks,deleteUser,CreateUser };