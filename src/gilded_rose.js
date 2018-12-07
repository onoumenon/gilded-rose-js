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
    return item.name === "Aged Brie"
  }

  isNotTicket(item) {
    return item.name != "Backstage passes to a TAFKAL80ETC concert";
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

  updateAgedBrieAndTicket(item) {
    this.incrementQuality(item);
    if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      this.backstagePassQualityUpdate(item);
    }
  }
  updateQuality() {
    let items = this.removeSulfuras();
    for (let item of items) {
      if (!this.isAgedBrie(item) && this.isNotTicket(item)) {
        this.decrementQuality(item);
      } else {
        this.updateAgedBrieAndTicket(item);
      }
      item.sellIn--;
      if (this.isExpired(item)) {
        if (!this.isAgedBrie(item)) {
          if (this.isNotTicket(item)) {
            this.decrementQuality(item);
          } else {
            item.quality = 0;
          }
        } else {
          this.incrementQuality(item);
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
};
