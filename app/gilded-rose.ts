import { Item } from "./item";

/*
======================================
Gilded Rose Requirements Specification
======================================

Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a
prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods.
Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We
have a system in place that updates our inventory for us. It was developed by a no-nonsense type named
Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that
we can begin selling a new category of items. First an introduction to our system:

	- All items have a SellIn value which denotes the number of days we have to sell the item
	- All items have a Quality value which denotes how valuable the item is
	- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

	- Once the sell by date has passed, Quality degrades twice as fast
	- The Quality of an item is never negative
	- "Aged Brie" actually increases in Quality the older it gets
	- The Quality of an item is never more than 50
	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
	- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

	- "Conjured" items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
still works correctly. However, do not alter the Item class or Items property as those belong to the
goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
ownership (you can make the UpdateQuality method and Items property static if you like, we'll cover
for you).

Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
legendary item and as such its Quality is 80 and it never alters.

*/

/* 
Assumptions:
  Each item has only one updating rule, i.e. it can't be legendary and aged at the same time.

  Since we can't modify the Item class, we have to rely on the item name, 
  looking at the string to infer the updating rule. This is heuristic and brittle, but
  it's the only option we have without modifying the Item class. It's also what the legacy code does.
*/

// Implementation should be immutable, i.e. return a new mapped item
type Updater = (item: Item) => Item;

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

const constrainQuality = (quality: number) =>
  Math.max(MIN_QUALITY, Math.min(MAX_QUALITY, quality));

// Once sell by is passed, quality degrades twice as fast
const normal: Updater = (item) =>
  new Item(
    item.name,
    item.sellIn - 1,
    constrainQuality(item.quality - (item.sellIn <= 0 ? 2 : 1))
  );

// No change, legendary items never have to be sold or decrease in quality
const legendary: Updater = (item) => item;

// For aged items, quality increases the older it gets
// Once sell by is passed, quality improves twice as fast (cheese gets more funky faster)
const aged: Updater = ({ name, sellIn, quality }) =>
  new Item(name, sellIn - 1, constrainQuality(quality + (sellIn <= 0 ? 2 : 1)));

// Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// Quality drops to 0 after the event
const eventTicket: Updater = ({ name, sellIn, quality }) =>
  new Item(
    name,
    sellIn - 1,
    sellIn > 0
      ? constrainQuality(
          quality + (sellIn > 10 ? 1 : sellIn > 5 ? 2 : sellIn > 0 ? 3 : 0)
        )
      : 0
  );

export function getUpdaterByItemName(name: Item["name"]): Updater {
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

export class GildedRose {
  constructor(public items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      const updater = getUpdaterByItemName(item.name);
      return updater(item);
    });
    return this.items;
  }
}
