import Post from "./Post"

export default function Posts() {

    function createPost(id: number, userName: string, userImage: string, img: string, caption: string){
        return{
            id,
            userName, 
            userImage,
            img,
            caption,
        }
    }

    const posts = [
        createPost(1, 'willian', 'https://i.pravatar.cc/150?img5', 'https://unsplash.com/pt-br/fotografias/CFkrwz1M_0s', 'imagem'),
        createPost(2, 'willian', 'https://i.pravatar.cc/150?img7', 'https://unsplash.com/pt-br/fotografias/uma-montanha-coberta-de-nuvens-e-arvores-pi3ffkYjnNk', 'Linda imagem')
    ]
  return (
    <div>
        {
            posts.map((post) => (
                <Post key={post.id} id={post.id} userName={post.userName} userImage={post.userImage} img={post.img} caption={post.caption} />
            ))
        }

    </div>
  )
}
