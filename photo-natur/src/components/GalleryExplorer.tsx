"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { photoCatalog, type PhotoCategory } from "@/data/photos";
import styles from "./GalleryExplorer.module.css";

type FilterKey = PhotoCategory | "All";

const categoryFilters: FilterKey[] = [
  "All",
  ...Array.from(new Set(photoCatalog.map((photo) => photo.category))),
];

export default function GalleryExplorer() {
  const [activeCategory, setActiveCategory] = useState<FilterKey>("All");

  const filteredPhotos = useMemo(() => {
    const scoped =
      activeCategory === "All"
        ? photoCatalog
        : photoCatalog.filter((photo) => photo.category === activeCategory);

    return [...scoped].sort((a, b) => b.rating - a.rating);
  }, [activeCategory]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div className={styles.filterGroup}>
          {categoryFilters.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={clsx(styles.filterButton, {
                [styles.activeFilter]: category === activeCategory,
              })}
            >
              {category}
            </button>
          ))}
        </div>
        <p className={styles.filterHint}>
          {activeCategory === "All"
            ? "Showing curator highlights across every biome."
            : `Highlighting ${filteredPhotos.length} frames from the ${activeCategory.toLowerCase()} biome.`}
        </p>
      </div>

      <div className={styles.grid}>
        {filteredPhotos.map((photo) => (
          <article key={photo.id} className={styles.card}>
            <div
              className={clsx(styles.imageWrap, {
                [styles.portrait]: photo.orientation === "portrait",
                [styles.landscape]: photo.orientation === "landscape",
              })}
            >
              <Image
                src={photo.imageUrl}
                alt={`${photo.title} — ${photo.location}`}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1200px) 44vw, 360px"
                className={styles.photo}
                priority={photo.rating > 4.8}
              />
            </div>
            <div className={styles.cardBody}>
              <header className={styles.cardHeader}>
                <span className={styles.cardBadge}>{photo.category}</span>
                <span className={styles.cardRating}>
                  {photo.rating.toFixed(1)}
                </span>
              </header>
              <h4 className={styles.cardTitle}>{photo.title}</h4>
              <p className={styles.cardDescription}>{photo.description}</p>
              <div className={styles.cardMeta}>
                <span>{photo.location}</span>
                <span aria-hidden>·</span>
                <span>{photo.photographer}</span>
              </div>
              <div className={styles.paletteRow}>
                {photo.palette.map((hex) => (
                  <span
                    key={`${photo.id}-${hex}`}
                    className={styles.paletteSwatch}
                    style={{ backgroundColor: hex }}
                    aria-label={`Palette tone ${hex}`}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
