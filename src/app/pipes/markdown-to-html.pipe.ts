import { Pipe, PipeTransform } from '@angular/core';
//import * as marked from 'marked';
import { marked } from 'marked'
import { remark} from 'remark'
@Pipe({
  name: 'markdownToHtml',
  standalone: true
})
export class MarkdownToHtmlPipe implements PipeTransform {

  transform(markdown: string): string {
    if (!markdown) return '';
    return marked(markdown).toString();
  }

}
