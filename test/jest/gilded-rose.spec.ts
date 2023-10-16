import { GildedRose } from "@/gilded-rose";
import { Item } from "@/item";

describe("Gilded Rose", () => {
  // make fresh instances because they are mutated
  const items = () => [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Conjured Mana Cake", 3, 6),
  ];

  it("should have the correct updates after 5 days", () => {
    const gildedRose = new GildedRose(items());

    for (let i = 0; i < 5; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items).toEqual([
      new Item("+5 Dexterity Vest", 5, 15),
      new Item("Aged Brie", -3, 8),
      new Item("Elixir of the Mongoose", 0, 2),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50),
      new Item("Conjured Mana Cake", -2, 0),
    ]);
  });

  it("should have the correct updates after 10 days", () => {
    const gildedRose = new GildedRose(items());

    for (let i = 0; i < 10; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items).toEqual([
      new Item("+5 Dexterity Vest", 0, 10),
      new Item("Aged Brie", -8, 18),
      new Item("Elixir of the Mongoose", -5, 0),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 35),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", -5, 0),
      new Item("Conjured Mana Cake", -7, 0),
    ]);
  });

  it("should have the correct updates after 100 days", () => {
    const gildedRose = new GildedRose(items());

    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items).toEqual([
      new Item("+5 Dexterity Vest", -90, 0),
      new Item("Aged Brie", -98, 50),
      new Item("Elixir of the Mongoose", -95, 0),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", -85, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", -90, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", -95, 0),
      new Item("Conjured Mana Cake", -97, 0),
    ]);
  });
});
