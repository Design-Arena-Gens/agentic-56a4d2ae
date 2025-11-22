import Image from "next/image";
import GalleryExplorer from "@/components/GalleryExplorer";
import { highlightCollections } from "@/data/photos";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
          alt="Morning mist rising from a forest valley"
          fill
          priority
          className={styles.heroImage}
          sizes="(max-width: 768px) 100vw, 1180px"
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Photo Natur</span>
          <h1 className={styles.heroTitle}>
            Where earth&apos;s quiet moments become timeless stories.
          </h1>
          <p className={styles.heroDescription}>
            Discover handpicked scenes from conservation photographers capturing
            the fragile harmony between light, weather, and wilderness. Each
            frame is archived with the stories, locations, and palettes that
            shaped it.
          </p>
          <div className={styles.metrics}>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>250K+</span>
              <span className={styles.metricLabel}>Images curated</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>68</span>
              <span className={styles.metricLabel}>Countries explored</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>412</span>
              <span className={styles.metricLabel}>Field photographers</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.collections}>
        <div className={styles.sectionHeading}>
          <h2>Signature Collections</h2>
          <p>
            Curated journeys through habitats in flux. Each collection maps an
            ecosystem&apos;s shifting colors, sounds, and seasonal moods.
          </p>
        </div>
        <div className={styles.collectionGrid}>
          {highlightCollections.map((collection) => (
            <article key={collection.id} className={styles.collectionCard}>
              <Image
                src={collection.imageUrl}
                alt={collection.title}
                fill
                className={styles.collectionBackground}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className={styles.collectionOverlay} />
              <div className={styles.collectionBody}>
                <span className={styles.collectionBadge}>{collection.season}</span>
                <h3>{collection.title}</h3>
                <div className={styles.collectionDetails}>
                  <span>{collection.location}</span>
                  <span>·</span>
                  <span>{collection.mood}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.sectionHeading}>
          <h2>Explore The Gallery</h2>
          <p>
            Filter by biome, palette, or atmosphere to uncover the stories that
            resonate with your next project.
          </p>
        </div>
        <GalleryExplorer />
      </section>

      <section className={styles.newsletter}>
        <h3>Collect the stories behind every landscape.</h3>
        <p>
          Join our field notes for monthly dispatches featuring new expeditions,
          processing workflows, and conservation spotlights handpicked by the
          Photo Natur editors.
        </p>
        <form className={styles.newsletterForm}>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className={styles.newsletterInput}
            aria-label="Email address"
          />
          <button type="submit" className={styles.newsletterButton}>
            Join The Circle
          </button>
        </form>
      </section>

      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Photo Natur</span>
        <span>Curated by nature storytellers worldwide.</span>
      </footer>
    </div>
  );
}
