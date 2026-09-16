import PageHeader from "@/components/PageHeader";
import Discussion from "@/components/Discussion";

export const metadata = {
  title: "Community",
  description:
    "The discussion board between sessions — questions, book suggestions, and problems worth solving out loud.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="The board"
        lede="Between sessions the conversation lives here. Ask about the current read, put a book forward, or work through something you are stuck on. Be useful and be kind; that is the whole moderation policy."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <Discussion />
      </section>
    </>
  );
}
