class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  isAgedBrie(item) {
    return item.name === "Aged Brie";
  }

  isTicket(item) {
    return item.name === "Backstage passes to a TAFKAL80ETC concert";
  }

  removeSulfuras() {
    return this.items.filter(
      item => item.name !== "Sulfuras, Hand of Ragnaros"
    );
  }

  isExpired(item) {
    return item.sellIn < 0;
  }

  incrementQuality(item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  decrementQuality(item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  backstagePassQualityUpdate(item) {
    if (item.sellIn < 11) {
      this.incrementQuality(item);
    }
    if (item.sellIn < 6) {
      this.incrementQuality(item);
    }
  }

  normalItems(item) {
    return item.name === "Normal Item";
  }

  updateAgedBrie(item) {
    this.incrementQuality(item);
    if (item.sellIn < 1) {
      this.incrementQuality(item);
    }
  }
  updateTicket(item) {
    this.incrementQuality(item);
    this.backstagePassQualityUpdate(item);
    if (item.sellIn < 1) {
      item.quality = 0;
    }
  }

  updateNormalItem(item) {
    this.decrementQuality(item)
    if (this.isExpired(item)) this.decrementQuality(item)
  }
  updateQuality() {
    let items = this.removeSulfuras();
    for (let item of items) {
      if (this.isAgedBrie(item)) {

        this.updateAgedBrie(item);
      }
      if (this.isTicket(item)) {
        this.updateTicket(item);
      }
      if (this.normalItems(item)) {
        this.updateNormalItem(item)
      }
      item.sellIn--;
      if (this.isExpired(item)) {
        this.decrementQuality(item);
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
};
