import { createServerSupabase } from "@/lib/supabase/server";
import { getPublishedPosts } from "@/lib/blog";
import { getPublishedProjects } from "@/lib/projects";

export interface HomepageStats {
  blogCount: number;
  projectCount: number;
  messageCount: number;
  totalViews: number;
  totalLikes: number;
  blogViews: number;
  blogLikes: number;
  projectViews: number;
  projectLikes: number;
  recentPostTitles: { title: string; slug: string; updated_at: string }[];
  recentProjectTitles: { title: string; slug: string; updated_at: string }[];
}

/** Anasayfa için canlı istatistikler: blog/proje sayıları, görüntülenme/beğeni toplamları, son eklenenler. */
export async function getHomepageStats(): Promise<HomepageStats> {
  const defaultStats: HomepageStats = {
    blogCount: 0,
    projectCount: 0,
    messageCount: 0,
    totalViews: 0,
    totalLikes: 0,
    blogViews: 0,
    blogLikes: 0,
    projectViews: 0,
    projectLikes: 0,
    recentPostTitles: [],
    recentProjectTitles: [],
  };

  try {
    const [posts, projects, messageCount] = await Promise.all([
      getPublishedPosts(),
      getPublishedProjects(),
      getMessageCount(),
    ]);

    const blogViews = posts.reduce((s, p) => s + (p.view_count ?? 0), 0);
    const blogLikes = posts.reduce((s, p) => s + (p.like_count ?? 0), 0);
    const projectViews = projects.reduce((s, p) => s + (p.view_count ?? 0), 0);
    const projectLikes = projects.reduce((s, p) => s + (p.like_count ?? 0), 0);

    const recentPostTitles = posts.slice(0, 5).map((p) => ({
      title: p.title,
      slug: p.slug,
      updated_at: p.updated_at,
    }));
    const recentProjectTitles = projects.slice(0, 5).map((p) => ({
      title: p.title,
      slug: p.slug,
      updated_at: p.updated_at,
    }));

    return {
      blogCount: posts.length,
      projectCount: projects.length,
      messageCount,
      totalViews: blogViews + projectViews,
      totalLikes: blogLikes + projectLikes,
      blogViews,
      blogLikes,
      projectViews,
      projectLikes,
      recentPostTitles,
      recentProjectTitles,
    };
  } catch {
    return defaultStats;
  }
}

/** İletişim / mesaj sayısı. messages tablosu yoksa 0 döner. */
async function getMessageCount(): Promise<number> {
  try {
    const supabase = createServerSupabase();
    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true });
    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}
