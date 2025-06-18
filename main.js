const obsidian = require('obsidian');

// --- Hardcoded Emoji Search Data ---
const EMOJI_DATA = {
  '😀': ['grinning', 'face', 'happy', 'smile', 'joy', 'cheerful'],
  '😃': ['grinning', 'face', 'big', 'eyes', 'happy', 'joy', 'smile', 'excited'],
  '😄': ['grinning', 'face', 'smiling', 'eyes', 'happy', 'joy', 'smile', 'laugh'],
  '😁': ['beaming', 'face', 'smiling', 'eyes', 'happy', 'joy', 'smile', 'teeth'],
  '😆': ['grinning', 'squinting', 'face', 'happy', 'laugh', 'smile', 'funny'],
  '😅': ['grinning', 'face', 'sweat', 'happy', 'smile', 'nervous', 'relief'],
  '🤣': ['rolling', 'floor', 'laughing', 'happy', 'joy', 'lmao', 'rofl', 'hilarious'],
  '😂': ['face', 'tears', 'joy', 'happy', 'laugh', 'cry', 'funny'],
  '🙂': ['slightly', 'smiling', 'face', 'happy', 'smile', 'content'],
  '🙃': ['upside', 'down', 'face', 'sarcastic', 'smile', 'silly', 'ironic'],
  '😉': ['winking', 'face', 'flirt', 'happy', 'wink', 'playful'],
  '😊': ['smiling', 'face', 'eyes', 'happy', 'smile', 'blush', 'proud', 'pleased'],
  '😇': ['smiling', 'face', 'halo', 'angel', 'happy', 'innocent', 'pure'],
  '🥰': ['smiling', 'face', 'hearts', 'love', 'happy', 'crush', 'adore', 'affection'],
  '😍': ['smiling', 'face', 'heart', 'eyes', 'love', 'happy', 'crush', 'beautiful'],
  '🤩': ['star', 'struck', 'happy', 'amazing', 'eyes', 'wow', 'impressed'],
  '😘': ['face', 'blowing', 'kiss', 'love', 'flirt', 'smooch', 'romance'],
  '😗': ['kissing', 'face', 'love', 'puckered', 'lips'],
  '😚': ['kissing', 'face', 'closed', 'eyes', 'love', 'happy', 'peaceful'],
  '😙': ['kissing', 'face', 'smiling', 'eyes', 'love', 'happy', 'content'],
  '❤️': ['red', 'heart', 'love', 'like', 'favorite', 'romance', 'passion'],
  '💕': ['two', 'hearts', 'love', 'like', 'affection', 'valentines'],
  '💖': ['sparkling', 'heart', 'love', 'like', 'affection', 'valentines', 'excited'],
  '😋': ['face', 'savoring', 'food', 'delicious', 'yum', 'tongue', 'lick', 'tasty'],
  '😛': ['face', 'tongue', 'silly', 'cheeky', 'playful'],
  '😜': ['winking', 'face', 'tongue', 'joke', 'silly', 'playful', 'teasing'],
  '🤪': ['zany', 'face', 'goofy', 'silly', 'crazy', 'wild'],
  '😝': ['squinting', 'face', 'tongue', 'silly', 'playful', 'teasing'],
  '🤑': ['money', 'mouth', 'face', 'rich', 'cash', 'dollar', 'finance', 'wealthy'],
  '💰': ['money', 'bag', 'cash', 'dollar', 'finance', 'payment', 'wealth', 'rich'],
  '💸': ['money', 'wings', 'dollar', 'cash', 'fly', 'spending', 'expensive'],
  '💳': ['credit', 'card', 'money', 'payment', 'finance', 'bank'],
  '🤗': ['hugging', 'face', 'hug', 'happy', 'thanks', 'grateful', 'embrace'],
  '👍': ['thumbs', 'up', 'like', 'good', 'approve', 'yes', 'positive', 'agree'],
  '👎': ['thumbs', 'down', 'dislike', 'bad', 'disapprove', 'no', 'negative'],
  '👏': ['clapping', 'hands', 'applause', 'congratulations', 'well', 'done'],
  '🙏': ['folded', 'hands', 'please', 'pray', 'thanks', 'grateful', 'namaste'],
  '✍️': ['writing', 'hand', 'write', 'document', 'sign', 'author', 'pen'],
  '🤔': ['thinking', 'face', 'wonder', 'idea', 'hmm', 'consider', 'ponder'],
  '🤫': ['shushing', 'face', 'quiet', 'silence', 'shh', 'secret'],
  '🤭': ['face', 'hand', 'over', 'mouth', 'oops', 'secret', 'whoops', 'giggle'],
  '🤥': ['lying', 'face', 'lie', 'pinocchio', 'nose', 'dishonest'],
  '🤯': ['exploding', 'head', 'mind', 'blown', 'shocked', 'amazed', 'wow'],
  '💻': ['laptop', 'computer', 'tech', 'macbook', 'pc', 'work', 'coding'],
  '📱': ['mobile', 'phone', 'smartphone', 'cell', 'device', 'tech'],
  '⌚': ['watch', 'time', 'clock', 'apple', 'smartwatch', 'wearable'],
  '📄': ['page', 'facing', 'up', 'document', 'file', 'text', 'paper', 'report'],
  '📊': ['bar', 'chart', 'graph', 'analytics', 'data', 'statistics', 'business'],
  '📈': ['chart', 'increasing', 'graph', 'trend', 'growth', 'analytics', 'up'],
  '📉': ['chart', 'decreasing', 'graph', 'trend', 'decline', 'analytics', 'down'],
  '📌': ['pushpin', 'pin', 'location', 'reminder', 'board', 'note', 'attach'],
  '🔥': ['fire', 'hot', 'lit', 'trend', 'flame', 'popular', 'amazing'],
  '⭐': ['star', 'favorite', 'amazing', 'rating', 'yellow', 'quality'],
  '🌟': ['glowing', 'star', 'sparkle', 'amazing', 'special', 'bright'],
  '✨': ['sparkles', 'magic', 'special', 'clean', 'shiny', 'new'],
  '🎉': ['party', 'popper', 'celebration', 'party', 'tada', 'congrats', 'confetti'],
  '🎊': ['confetti', 'ball', 'party', 'celebration', 'festive', 'colorful'],
  '💡': ['light', 'bulb', 'idea', 'innovation', 'solution', 'suggestion', 'bright'],
  '❓': ['question', 'mark', 'help', 'query', 'confused', 'doubt', 'ask'],
  '❗': ['exclamation', 'mark', 'warning', 'alert', 'important', 'notice', 'attention'],
  '⚡': ['lightning', 'bolt', 'electric', 'power', 'energy', 'fast', 'quick'],
  '📅': ['calendar', 'date', 'schedule', 'appointment', 'month', 'year', 'time'],
  '📆': ['tear', 'off', 'calendar', 'date', 'schedule', 'day', 'month'],
  '⏰': ['alarm', 'clock', 'time', 'reminder', 'morning', 'wake', 'schedule'],
  '⏱️': ['stopwatch', 'timer', 'time', 'speed', 'race', 'measure'],
  '⏳': ['hourglass', 'time', 'wait', 'sand', 'timer', 'patience'],
  '⌛': ['hourglass', 'done', 'time', 'finished', 'complete', 'end'],
  '🌍': ['globe', 'earth', 'world', 'planet', 'global', 'international', 'europe'],
  '🌎': ['globe', 'earth', 'world', 'planet', 'global', 'international', 'americas'],
  '🌏': ['globe', 'earth', 'world', 'planet', 'global', 'international', 'asia'],
  '🔍': ['magnifying', 'glass', 'tilted', 'left', 'search', 'find', 'zoom', 'details'],
  '🔎': ['magnifying', 'glass', 'tilted', 'right', 'search', 'find', 'zoom', 'details'],
  '🌲': ['evergreen', 'tree', 'pine', 'nature', 'forest', 'christmas', 'coniferous'],
  '🌳': ['deciduous', 'tree', 'nature', 'forest', 'summer', 'leafy'],
  '🌴': ['palm', 'tree', 'tropical', 'island', 'vacation', 'beach', 'coconut'],
  '🌵': ['cactus', 'desert', 'plant', 'nature', 'spike', 'succulent'],
  '🌱': ['seedling', 'plant', 'grow', 'nature', 'new', 'young', 'sprout'],
  '🌿': ['herb', 'plant', 'nature', 'green', 'leaf', 'organic'],
  '🍀': ['four', 'leaf', 'clover', 'lucky', 'fortune', 'irish', 'green'],
  '🍇': ['grapes', 'fruit', 'purple', 'wine', 'vineyard'],
  '🍈': ['melon', 'fruit', 'green', 'cantaloupe'],
  '🍉': ['watermelon', 'fruit', 'red', 'summer', 'juicy'],
  '🍊': ['tangerine', 'orange', 'fruit', 'citrus', 'vitamin'],
  '🍋': ['lemon', 'fruit', 'yellow', 'citrus', 'sour', 'vitamin'],
  '🍌': ['banana', 'fruit', 'yellow', 'potassium', 'tropical'],
  '🍍': ['pineapple', 'fruit', 'tropical', 'sweet', 'spiky'],
  '🥭': ['mango', 'fruit', 'tropical', 'orange', 'sweet'],
  '🍎': ['red', 'apple', 'fruit', 'healthy', 'crisp'],
  '🍏': ['green', 'apple', 'fruit', 'healthy', 'granny', 'smith'],
  '🍐': ['pear', 'fruit', 'green', 'sweet'],
  '🍑': ['cherries', 'fruit', 'red', 'sweet', 'summer'],
  '🍒': ['cherry', 'fruit', 'red', 'sweet', 'small'],
  '🍓': ['strawberry', 'fruit', 'red', 'sweet', 'berry'],
  '🥝': ['kiwi', 'fruit', 'green', 'brown', 'fuzzy'],
  '🍅': ['tomato', 'fruit', 'vegetable', 'red', 'salad'],
  '🏃‍♂️': ['man', 'running', 'run', 'exercise', 'fitness', 'sport', 'jog'],
  '🏃‍♀️': ['woman', 'running', 'run', 'exercise', 'fitness', 'sport', 'jog'],
  '🏊‍♂️': ['man', 'swimming', 'swim', 'pool', 'water', 'sport', 'exercise'],
  '🏊‍♀️': ['woman', 'swimming', 'swim', 'pool', 'water', 'sport', 'exercise'],
  '🚴‍♂️': ['man', 'biking', 'bicycle', 'bike', 'cycling', 'sport', 'exercise'],
  '🚴‍♀️': ['woman', 'biking', 'bicycle', 'bike', 'cycling', 'sport', 'exercise'],
  '🏔️': ['mountain', 'snow', 'capped', 'peak', 'hiking', 'climbing'],
  '🗻': ['mount', 'fuji', 'mountain', 'japan', 'peak', 'volcano'],
  '📚': ['books', 'stack', 'study', 'education', 'library', 'reading', 'knowledge'],
  '📖': ['open', 'book', 'reading', 'study', 'education', 'novel'],
  '📝': ['memo', 'note', 'writing', 'document', 'list', 'paper'],
  '🎓': ['graduation', 'cap', 'education', 'university', 'degree', 'academic'],
  '🖊️': ['pen', 'writing', 'ink', 'document', 'sign', 'ballpoint'],
  '✏️': ['pencil', 'writing', 'draw', 'sketch', 'school', 'wood'],
  '🖌️': ['paintbrush', 'art', 'painting', 'creative', 'artist', 'brush'],
  '🥑': ['avocado', 'fruit', 'green', 'healthy', 'guacamole', 'toast'],
  '🥖': ['baguette', 'bread', 'french', 'loaf', 'bakery'],
  '🍞': ['bread', 'loaf', 'slice', 'toast', 'bakery'],
  '🧈': ['butter', 'dairy', 'yellow', 'spread', 'cooking'],
  '🥐': ['croissant', 'pastry', 'french', 'breakfast', 'buttery'],
  '🍳': ['cooking', 'egg', 'frying', 'pan', 'breakfast', 'kitchen'],
  '🍽️': ['fork', 'knife', 'plate', 'dining', 'meal', 'restaurant'],
  '🛒': ['shopping', 'cart', 'grocery', 'store', 'buy', 'supermarket'],
  '🗂️': ['card', 'index', 'dividers', 'organize', 'file', 'office'],
  '📁': ['file', 'folder', 'organize', 'documents', 'office', 'storage'],
  '📂': ['open', 'file', 'folder', 'organize', 'documents', 'office'],
  '🗃️': ['card', 'file', 'box', 'storage', 'organize', 'office'],
  '🏠': ['house', 'home', 'building', 'residence', 'family'],
  '🏢': ['office', 'building', 'work', 'business', 'corporate', 'skyscraper'],
  '🔧': ['wrench', 'tool', 'repair', 'fix', 'maintenance', 'mechanic'],
  '🧹': ['broom', 'clean', 'sweep', 'tidy', 'housework', 'janitor'],
  '🚗': ['car', 'automobile', 'vehicle', 'drive', 'transport', 'red'],
  '🚙': ['sport', 'utility', 'vehicle', 'suv', 'car', 'blue'],
  '🚕': ['taxi', 'cab', 'car', 'yellow', 'transport', 'ride'],
  '🚌': ['bus', 'vehicle', 'transport', 'public', 'commute'],
  '🚲': ['bicycle', 'bike', 'cycle', 'pedal', 'exercise', 'green'],
  '✈️': ['airplane', 'plane', 'flight', 'travel', 'aviation', 'jet'],
  '🚀': ['rocket', 'space', 'launch', 'nasa', 'fast', 'moon'],
  '☀️': ['sun', 'sunny', 'bright', 'hot', 'weather', 'day'],
  '🌙': ['crescent', 'moon', 'night', 'sleep', 'lunar', 'sky'],
  '⭐': ['star', 'night', 'sky', 'bright', 'space', 'yellow'],
  '🌈': ['rainbow', 'colorful', 'weather', 'pride', 'arc', 'colors'],
  '⛅': ['partly', 'cloudy', 'sun', 'behind', 'cloud', 'weather'],
  '🌧️': ['rain', 'cloud', 'weather', 'water', 'drops', 'storm'],
  '❄️': ['snowflake', 'snow', 'cold', 'winter', 'ice', 'frozen'],
};

const DEFAULT_DATA = {
  settings: {
    recentlyUsedIcons: []
  },
};

class IconizePlugin extends obsidian.Plugin {
  constructor(app, manifest) {
    super(app, manifest);
  }

  async onload() {
    console.log('Loading JS Iconize Plugin v1.4.1 (Bugfixes)');

    await this.loadPluginData();

    this.updateAllIcons = () => {
      try {
        const fileExplorerNodes = this.app.workspace.containerEl.querySelectorAll(
          '.nav-file-title, .nav-folder-title'
        );
        fileExplorerNodes.forEach((node) => {
          const path = node.dataset.path;
          const iconIdentifier = this.iconData[path];
          const titleContent = node.querySelector('.nav-file-title-content, .nav-folder-title-content');
          if (!titleContent) return;
          
          const existingIconEl = titleContent.querySelector('.iconize-icon');

          if (iconIdentifier) {
            if (!existingIconEl || existingIconEl.dataset.icon !== iconIdentifier) {
                if(existingIconEl) existingIconEl.remove();
                this.createIconElement(titleContent, iconIdentifier);
            }
          } else if (existingIconEl) {
            existingIconEl.remove();
          }
        });
      } catch (error) {
        console.error("JS Iconize Plugin Error:", error);
      }
    };

    this.observer = new MutationObserver(this.updateAllIcons);
    this.observer.observe(this.app.workspace.containerEl, {
      childList: true,
      subtree: true,
    });
    
    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        menu.addItem((item) => {
          item
            .setTitle("Change icon")
            .setIcon("hashtag")
            .onClick(async () => {
              new IconPickerModal(this.app, this, file, (newIcon) => {
                this.updateIcon(file.path, newIcon);
              }).open();
            });
        });
      })
    );

    this.addSettingTab(new IconizeSettingTab(this.app, this));
    this.app.workspace.onLayoutReady(this.updateAllIcons);
  }

  onunload() {
    if (this.observer) this.observer.disconnect();
  }

  createIconElement(parentEl, iconIdentifier) {
    const iconEl = createEl('div', { cls: 'iconize-icon' });
    iconEl.dataset.icon = iconIdentifier;

    if (iconIdentifier.startsWith('lucide-')) {
      obsidian.setIcon(iconEl, iconIdentifier);
    } else if (iconIdentifier.trim().startsWith('<svg')) {
      iconEl.innerHTML = iconIdentifier;
    } else {
      iconEl.textContent = iconIdentifier;
    }

    parentEl.prepend(iconEl);
  }

  async updateIcon(path, newIcon) {
      if (newIcon && newIcon.trim() !== '') {
        const trimmedIcon = newIcon.trim();
        this.iconData[path] = trimmedIcon;
        this.addRecentIcon(trimmedIcon);
      } else {
        delete this.iconData[path];
      }
      await this.savePluginData();
      this.updateAllIcons();
  }

  addRecentIcon(icon) {
      const recents = this.iconData.settings.recentlyUsedIcons || [];
      const index = recents.indexOf(icon);
      if (index !== -1) {
          recents.splice(index, 1);
      }
      recents.unshift(icon);
      this.iconData.settings.recentlyUsedIcons = recents.slice(0, 10);
  }

  async loadPluginData() {
    this.iconData = structuredClone(DEFAULT_DATA);
    const loadedData = await this.loadData();
    if (loadedData) {
        this.iconData = Object.assign(this.iconData, loadedData);
        this.iconData.settings = Object.assign({}, DEFAULT_DATA.settings, this.iconData.settings);
    }
  }

  async savePluginData() {
    await this.saveData(this.iconData);
  }
}

class IconPickerModal extends obsidian.Modal {
  constructor(app, plugin, file, callback) {
    super(app);
    this.plugin = plugin;
    this.file = file;
    this.callback = callback;
  }

  createFragmentWithHTML(html) {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) {
      fragment.appendChild(div.firstChild);
    }
    return fragment;
  }

  searchEmojis(query) {
      const lowerCaseQuery = query.toLowerCase();
      const queryWords = lowerCaseQuery.split(' ').filter(w => w.length > 0);
      const results = [];
      
      for (const [emoji, keywords] of Object.entries(EMOJI_DATA)) {
        const allWordsMatch = queryWords.every(word => 
          keywords.some(keyword => keyword.includes(word))
        );
        
        if (allWordsMatch) {
          let score = 0;
          queryWords.forEach(word => {
            keywords.forEach(keyword => {
              if (keyword === word) score += 10;
              else if (keyword.startsWith(word)) score += 5;
              else if (keyword.includes(word)) score += 1;
            });
          });
          results.push({ emoji, score });
        }
      }
      
      return results
        .sort((a, b) => b.score - a.score)
        .map(result => result.emoji);
  }

  searchIcons(query) {
    const searchResultsEl = this.contentEl.querySelector('.iconize-search-results');
    if (!searchResultsEl) return;
    searchResultsEl.empty();
    
    if (!query || query.length < 2) return;

    const lowerCaseQuery = query.toLowerCase();
    
    const lucideResults = obsidian.getIconIds()
        .filter(iconId => iconId.startsWith('lucide-') && iconId.toLowerCase().includes(lowerCaseQuery));

    const emojiResults = this.searchEmojis(query);
    
    const uniqueResults = [...new Set([...lucideResults, ...emojiResults])];

    for (const icon of uniqueResults.slice(0, 100)) {
        const btn = searchResultsEl.createEl('button', { cls: 'iconize-result-button' });
        
        if (icon.startsWith('lucide-')) {
            obsidian.setIcon(btn, icon);
        } else {
            btn.textContent = icon;
        }
        
        btn.onclick = () => {
            this.callback(icon);
            this.close();
        };
    }
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: `Set icon for: ${this.file.name}` });

    contentEl.createEl("p", { text: "Recently used:" });
    const recentContainer = contentEl.createDiv();
    const recents = this.plugin.iconData.settings.recentlyUsedIcons || [];
    recents.forEach(icon => {
        const btn = recentContainer.createEl("button", { cls: 'iconize-recent-button' });
        btn.style.margin = '5px';
        btn.style.fontSize = '18px';
        
        if (icon.startsWith('lucide-')) {
            obsidian.setIcon(btn, icon);
        } else {
            btn.textContent = icon;
        }
        
        btn.onclick = () => {
            this.callback(icon);
            this.close();
        };
    });

    new obsidian.Setting(contentEl)
      .setName("Search for icon")
      .setDesc(this.createFragmentWithHTML(
          `Search for a Lucide icon or emoji by its name.<br><br>
           <b>Tip:</b> For a complete emoji list, use the native picker: <br>
           &nbsp;&nbsp;•&nbsp;&nbsp;<b>Windows:</b> <code>Windows Key</code> + <code>.</code> <br>
           &nbsp;&nbsp;•&nbsp;&nbsp;<b>macOS:</b> <code>Control</code> + <code>Command</code> + <code>Space</code>`
      ))
      .addText((text) => {
        text.inputEl.oninput = () => this.searchIcons(text.getValue());

        text.inputEl.onkeydown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault(); 
                this.callback(text.getValue());
                this.close();
            }
        };
      });
      
    contentEl.createDiv({ cls: 'iconize-search-results' });

    new obsidian.Setting(contentEl)
        .addButton((btn) =>
            btn
            .setButtonText("Remove Icon")
            .onClick(() => {
                this.callback('');
                this.close();
            })
        );
  }

  onClose() {
    this.contentEl.empty();
  }
}

class IconizeSettingTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'Iconize Settings' });

    new obsidian.Setting(containerEl)
        .setName('Clear recent icons')
        .setDesc('This will clear the list of recently used icons shown in the picker.')
        .addButton(button => {
            button
                .setButtonText('Clear')
                .setWarning()
                .onClick(() => {
                    this.plugin.iconData.settings.recentlyUsedIcons = [];
                    this.plugin.savePluginData();
                    new obsidian.Notice('Recently used icons have been cleared.');
                });
        });
  }
}

module.exports = IconizePlugin;