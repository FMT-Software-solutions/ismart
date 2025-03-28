'use client';

import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { cn } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Redo,
  Undo,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write something...',
  className,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkMenu, setShowLinkMenu] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          'min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const handleLinkSubmit = useCallback(() => {
    if (!editor) return;

    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }

    setShowLinkMenu(false);
    setLinkUrl('');
  }, [editor, linkUrl]);

  if (!isMounted) {
    return (
      <div
        className={cn(
          'min-h-[200px] w-full rounded-md border border-input',
          className
        )}
      ></div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {editor && (
        <div className="flex flex-wrap items-center gap-1 rounded-md border border-input p-1">
          <ToggleGroup type="multiple" className="flex flex-wrap gap-1">
            <ToggleGroupItem
              value="bold"
              aria-label="Toggle bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-state={editor.isActive('bold') ? 'on' : 'off'}
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Toggle italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-state={editor.isActive('italic') ? 'on' : 'off'}
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="underline"
              aria-label="Toggle underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              data-state={editor.isActive('underline') ? 'on' : 'off'}
            >
              <UnderlineIcon className="h-4 w-4" />
            </ToggleGroupItem>

            <Popover open={showLinkMenu} onOpenChange={setShowLinkMenu}>
              <PopoverTrigger asChild>
                <ToggleGroupItem
                  value="link"
                  aria-label="Toggle link"
                  data-state={editor.isActive('link') ? 'on' : 'off'}
                >
                  <LinkIcon className="h-4 w-4" />
                </ToggleGroupItem>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-3" align="start">
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Enter URL"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleLinkSubmit();
                      }
                    }}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowLinkMenu(false)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleLinkSubmit}>
                      {editor.isActive('link') ? 'Update Link' : 'Add Link'}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </ToggleGroup>

          <div className="mx-2 h-6 w-px bg-border" />

          <ToggleGroup type="multiple" className="flex flex-wrap gap-1">
            <ToggleGroupItem
              value="bulletList"
              aria-label="Toggle bullet list"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              data-state={editor.isActive('bulletList') ? 'on' : 'off'}
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="orderedList"
              aria-label="Toggle ordered list"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              data-state={editor.isActive('orderedList') ? 'on' : 'off'}
            >
              <ListOrdered className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="mx-2 h-6 w-px bg-border" />

          <ToggleGroup
            type="single"
            className="flex flex-wrap gap-1"
            value={
              editor.isActive({ textAlign: 'left' })
                ? 'left'
                : editor.isActive({ textAlign: 'center' })
                ? 'center'
                : editor.isActive({ textAlign: 'right' })
                ? 'right'
                : editor.isActive({ textAlign: 'justify' })
                ? 'justify'
                : 'left'
            }
          >
            <ToggleGroupItem
              value="left"
              aria-label="Align left"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
            >
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="center"
              aria-label="Align center"
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
            >
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="right"
              aria-label="Align right"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
            >
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="justify"
              aria-label="Justify"
              onClick={() =>
                editor.chain().focus().setTextAlign('justify').run()
              }
            >
              <AlignJustify className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="mx-2 h-6 w-px bg-border" />

          <ToggleGroup
            type="single"
            className="flex flex-wrap gap-1"
            value={
              editor.isActive('heading', { level: 1 })
                ? 'h1'
                : editor.isActive('heading', { level: 2 })
                ? 'h2'
                : editor.isActive('heading', { level: 3 })
                ? 'h3'
                : 'paragraph'
            }
          >
            <ToggleGroupItem
              value="h1"
              aria-label="Heading 1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Heading1 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h2"
              aria-label="Heading 2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h3"
              aria-label="Heading 3"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Heading3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="paragraph"
              aria-label="Paragraph"
              onClick={() => editor.chain().focus().setParagraph().run()}
              data-state={
                editor.isActive('paragraph') && !editor.isActive('heading')
                  ? 'on'
                  : 'off'
              }
            >
              <span className="text-xs font-semibold">P</span>
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="ml-auto flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <EditorContent editor={editor} placeholder={placeholder} />

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center rounded-md border border-muted bg-background shadow-md">
            <Toggle
              size="sm"
              pressed={editor.isActive('bold')}
              onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive('italic')}
              onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
              }
            >
              <Italic className="h-4 w-4" />
            </Toggle>
            <Toggle
              size="sm"
              pressed={editor.isActive('underline')}
              onPressedChange={() =>
                editor.chain().focus().toggleUnderline().run()
              }
            >
              <UnderlineIcon className="h-4 w-4" />
            </Toggle>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
}
