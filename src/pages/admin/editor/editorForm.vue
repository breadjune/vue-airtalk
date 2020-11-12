<template>
  <div>
    <b-form id="form">
     <div>
        <label>작성자</label>
        <b-input id="amdinId" name="adminId" type="text" readonly></b-input>
     </div>
      <div >
        <label>제목</label>
        <b-input id="title" name="title" type="text" v-model="title"></b-input>
      </div>
      <div>
          <label>내용</label>
       <card>
        <div class="editor">
          <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
              >
                <img class="icon" src="@/assets/img/icons/bold.svg" alt="" />
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
              >
                <!-- <icon name="italic" /> -->
                <img class="icon" src="@/assets/img/icons/italic.svg" alt="" />
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.strike() }"
                @click="commands.strike"
              >
                <img class="icon" src="@/assets/img/icons/strike.svg" alt="" />
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
              >
                <img
                  class="icon"
                  src="@/assets/img/icons/underline.svg"
                  alt=""
                />
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.code() }"
                @click="commands.code"
              >
                <img class="icon" src="@/assets/img/icons/code.svg" alt="" />
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.paragraph() }"
                @click="commands.paragraph"
              >
                <img
                  class="icon"
                  src="@/assets/img/icons/paragraph.svg"
                  alt=""
                />
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
              >
                H1
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
              >
                H2
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
              >
                H3
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
              >
                <img class="icon" src="@/assets/img/icons/ul.svg" alt="" />
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
              >
                <img class="icon" src="@/assets/img/icons/ol.svg" alt="" />
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.blockquote() }"
                @click="commands.blockquote"
              >
                <img class="icon" src="@/assets/img/icons/quote.svg" alt="" />
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.code_block() }"
                @click="commands.code_block"
              >
                <img class="icon" src="@/assets/img/icons/code.svg" alt="" />
              </button>

              <button class="menubar__button" @click="commands.horizontal_rule">
                <img class="icon" src="@/assets/img/icons/hr.svg" alt="" />
              </button>

              <button class="menubar__button" @click="commands.undo">
                <img class="icon" src="@/assets/img/icons/undo.svg" alt="" />
              </button>

              <button class="menubar__button" @click="commands.redo">
                <img class="icon" src="@/assets/img/icons/redo.svg" alt="" />
              </button>
            </div>
          </editor-menu-bar>

          <editor-content class="editor__content" :editor="editor" />
        </div>
      </card>
      </div>
      
    </b-form>
    <div class="col">
        <h2>HTML</h2>
        <pre>
        {{ html }}
      </pre>
      </div>
    <hr />
  </div>
</template>

<script>
import Icon from "src/components/Icon/index.vue";
import '@/assets/sass/main.scss';
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from "tiptap-extensions";
import svgSpriteLoader from "src/helpers/svg-sprite-loader";

const __svg__ = {
  path: "src/assets/img/icons/*.svg",
  name: "assets/img/[hash].sprite.svg",
};
svgSpriteLoader(__svg__.filename);

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    Icon,
  },
  data() {
    return {
          title:"",
          adminId:"",
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content:
        `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `,
        
      }),
    };  
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  computed: {
      html() {
        if (!this.editor) return "";
        return this.editor.getHTML();
    }
  },
  watch: {
        title(){
            console.log(this.title);
            this.$emit('childs-event', this.title, this.editor.getHTML());
            },
        html(){
              console.log(this.editor.getHTML());
              this.$emit('childs-event', this.title,this.editor.getHTML());

        }
         },
};
</script>

<style lang="scss" scope>
.icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 0.8rem;
  height: 0.8rem;
  margin: 0 0.3rem;
  top: -0.05rem;
  fill: currentColor;

  &.has-align-fix {
  	top: -.1rem;
  }

  &__svg {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
}

// svg sprite
body > svg,
.icon use > svg,
symbol {
  path,
  rect,
  circle,
  g {
    fill: currentColor;
    stroke: none;
  }

  *[d="M0 0h24v24H0z"] {
    display: none;
  }
}
</style>