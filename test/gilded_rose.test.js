const { Shop, Item } = require("../src/gilded_rose.js");

describe("Gilded Rose", () => {
  it("should degrade the quality twice as fast, after sell by date for normal item", () => {
    const shop = new Shop([new Item("Normal Item", 0, 5)]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(new Item("Normal Item", -1, 3));
  });

  it("should not decrease an item's quality below zero", () => {
    const shop = new Shop([new Item("Normal Item", 0, 0)]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(new Item("Normal Item", -1, 0));
  });

  it("should increase the quality of 'Aged Brie' the older it gets", () => {
    const shop = new Shop([new Item("Aged Brie", 10, 40)]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", 9, 41));
  });

  it("should not increase an item's quality above 50", () => {
    const shop = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(new Item("Aged Brie", 9, 50));
  });

  it("should not decrease or increase the sell in or quality of Sulfuras a legendary item with quality < 50 ", () => {
    const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 49)]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 10, 49));
  });

  it("should not decrease or increase the sell in or quality of Sulfuras a legendary item with quality > 50", () => {
    const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 51)]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 10, 51));
  });

  it("should increase the quality of 'Backstage passes' by 2, 10 - 6 days before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 48)
    ]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 8, 50)
    );
  });

  it("should increase the quality of 'Backstage passes' by 1, 11  days before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 40)
    ]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 41)
    );
  });

  it("should increase the quality of 'Backstage passes' by 3, 1-5 days before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, 20)
    ]);
    let items = shop.updateQuality();
    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 22)
    );
    expect(items[1]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 23)
    );
    expect(items[2]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 23)
    );
  });

  it("should decrease the quality of 'Backstage passes' to 0, after the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)
    ]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0)
    );
  });

  it("should decrease the quality of 'Conjured Item' twice as fast as normal items before expiry", () => {
    const shop = new Shop([new Item("Conjured Item", 10, 20)]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(new Item("Conjured Item", 9, 18));
  });

  it("should decrease the quality of 'conjured' twice as fast as normal items after expiry", () => {
    const shop = new Shop([new Item("Conjured Item", 0, 20)]);
    const items = shop.updateQuality();
    expect(items[0]).toEqual(new Item("Conjured Item", -1, 16));
  });
});
