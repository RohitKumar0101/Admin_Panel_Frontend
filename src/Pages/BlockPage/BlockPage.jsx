import { Layout } from "../../Layout/Layout";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const BlockPage = ({file})=>{
    return <Layout file={file}>
        <div className=" bg-gray-100 p-5">

       <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        // console.log("Editor is ready to use!", editor);
                        editor.editing.view.change((writer) => {
                            writer.setStyle(
                                "height",
                                "550px",
                                editor.editing.view.document.getRoot()
                                );
                            });
                        }}
                        
                        
                        
                        // onReady={ editor => {
                            //     // You can store the "editor" and use when it is needed.
                            //     console.log( 'Editor is ready to use!', editor );
                            // } }
                            onChange={ ( event ) => {
                                console.log( event );
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                            />
                            </div>
    </Layout>
}