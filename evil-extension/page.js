const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node, level) {

  console.log('NodeName:'+node.nodeName);
  console.log('NodeType:'+node.nodeType);

  if(node.nodeType===Node.TEXT_NODE)
  {
    console.log('Text Node');
    let tmp = node.textContent;
    console.log(tmp);

    if(tmp.trim().length!==0)// avoid manipulating string only containing space characters
    {
      for(let key in MATCH_LIST)
      {
        console.log('Key:'+key);

        let re = new RegExp('(\\s)'+key+'(\\s)', 'g');
        tmp = tmp.replace(re, '$1'+MATCH_LIST[key]+'@$2');

        //head of string
        re = new RegExp('^'+key+'(\\s)', 'g');
        tmp = tmp.replace(re, MATCH_LIST[key]+'@$1');

        //tail of string
        re = new RegExp('(\\s)'+key+'$', 'g');
        tmp = tmp.replace(re, '$1'+MATCH_LIST[key]+'@');

        //there is only a word in string
        re = new RegExp('^'+key+'$', 'g');
        tmp = tmp.replace(re, MATCH_LIST[key]+'@');

        console.log('Replace:'+tmp);
      }

      tmp = tmp.replace(/(\w+)@/g,'$1');
      node.textContent = tmp;
    }
  }
  else
  {
    console.log('Other Node');
  }

  for(let i of node.childNodes)
  {
    transformTextNodes(i,level+1);
  }

}

transformTextNodes(document.querySelector('body'),0);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension updated');
