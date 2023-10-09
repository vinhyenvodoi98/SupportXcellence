import Layout from "@/components/layout/Layout";
import EditorJsRenderer from '@/components/Editor/EditorJsRenderer';

export default function Projects() {
  const contents = {
    time: 1686060802429,
    blocks:[{
      id:"7MCCCx2E0B",
      type:"header",
      data:{
        text:"Hello world",
        level:3
      }},{
        id:"k2awdZazJz",
        type:"paragraph",
        data:{
          text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean le"
        }},{
            id:"IdKbrWd0MQ",type:"list",data:{style:"ordered","items":["đâsdasd","ádf","23ẻt","rtgh"]}
          },{
            id:"Bij3_TAumW",
            type:"delimiter",
            data:{}
          },{
            id:"r9Rvcl99DB",
            type:"paragraph",
            data:{
              text:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidus"
            }}],
            version:"2.27.0"
          }

  return (
    <Layout>
      <div className='card w-full border bg-base-100 shadow-xl p-8'>
        <EditorJsRenderer data={contents}/>
      </div>
    </Layout>
  );
}
