import { Item } from "./item";

// Implementation should be immutable, i.e. return a new mapped item
type ItemUpdater = (item: Item) => Item;

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

const constrainQuality = (quality: number) =>
  Math.max(MIN_QUALITY, Math.min(MAX_QUALITY, quality));

// Once sell by is passed, quality degrades twice as fast
const normal: ItemUpdater = (item) =>
  new Item(
    item.name,
    item.sellIn - 1,
    constrainQuality(item.quality - (item.sellIn <= 0 ? 2 : 1))
  );

// No change, legendary items never have to be sold or decrease in quality
const legendary: ItemUpdater = (item) => item;

// For aged items, quality increases the older it gets
// Once sell by is passed, quality improves twice as fast (cheese gets more funky faster)
const aged: ItemUpdater = ({ name, sellIn, quality }) =>
  new Item(name, sellIn - 1, constrainQuality(quality + (sellIn <= 0 ? 2 : 1)));

// Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// Quality drops to 0 after the event
const eventTicket: ItemUpdater = ({ name, sellIn, quality }) =>
  new Item(
    name,
    sellIn - 1,
    sellIn > 0
      ? constrainQuality(
          quality + (sellIn > 10 ? 1 : sellIn > 5 ? 2 : sellIn > 0 ? 3 : 0)
        )
      : 0
  );

export function getItemUpdaterByItemName(name: Item["name"]): ItemUpdater {
  switch (name) {
    case "Aged Brie":
      return aged;
    case "Backstage passes to a TAFKAL80ETC concert":
      return eventTicket;
    case "Sulfuras, Hand of Ragnaros":
      return legendary;
    default:
      return normal;
  }
}
