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
    if (item.sellIn < 10) {
      this.incrementQuality(item);
    }
    if (item.sellIn < 5) {
      this.incrementQuality(item);
    }
  }

  normalItems(item) {
    return item.name === "Normal Item";
  }

  updateAgedBrie(item) {
    if (this.isAgedBrie(item)) {
      this.incrementQuality(item);
    }
  }
  updateTicket(item) {
    if (this.isTicket(item)) {
      if (item.sellIn < 0) {
        return item.quality = 0;
      }
      this.incrementQuality(item);
      this.backstagePassQualityUpdate(item);
    }
    
  }

  updateNormalItem(item) {
    if (this.normalItems(item)) {
      this.decrementQuality(item);
      if (this.isExpired(item)) {
        this.decrementQuality(item);
      }      
    }
    
  }
  updateQuality() {
    let items = this.removeSulfuras();
    for (let item of items) {
      this.updateAgedBrie(item);
      
      item.sellIn--;
      this.updateTicket(item);

      this.updateNormalItem(item);
      // if (this.isExpired(item)) {
        // this.decrementQuality(item);
      // }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
};
