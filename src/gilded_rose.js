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

  isNotAgedBrie(item) {
    return item.name != "Aged Brie";
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

  increment(item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  decrement(item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  backstagePassQualityUpdate(item) {
    if (item.sellIn < 11) {
      this.increment(item);
    }
    if (item.sellIn < 6) {
      this.increment(item);
    }
  }
  updateQuality() {
    let items = this.removeSulfuras();
    for (let item of items) {
      if (this.isNotAgedBrie(item) && this.isNotTicket(item)) {
        this.decrement(item);
      } else {
        this.increment(item);
        if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
          this.backstagePassQualityUpdate(item);
        }
      }
      item.sellIn--;
      if (this.isExpired(item)) {
        if (this.isNotAgedBrie(item)) {
          if (this.isNotTicket(item)) {
            this.decrement(item);
          } else {
            item.quality = 0;
          }
        } else {
          this.increment(item);
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
