import type { NextPage, GetServerSideProps } from 'next';
import { useEffect } from 'react';
import MainContainer from '../components/MainContainer/MainContainer';
import SharePost from '../components/SharePost/SharePost';
import HomeRightbar from '../components/HomeRightbar/HomeRightbar';
import Post from '../components/Post/Post';
import {useRefresh} from '../apollo/mutations/refresh';

import styles from '../public/styles/home.module.scss';
import validateRefreshToken from '../utils/validateRefreshToken';


const fakePosts: {
  id: number;
  user: {
    id: number;
    name: string;
    profilePicture: string;
  };
  desc: string;
  imgs: string[];
  likes: number[];
  dislikes: number[];
  commentsCount: number;
  createdAt: string;
  shareCount: number;
}[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: 'Владилен Пестров',
      profilePicture: "/imgs/photo1.jpg"
    },
    createdAt: '2021-08-14 01:56:02.384+03',
    desc: 'Лишь тщательные исследования конкурентов, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут в равной степени предоставлены сами себе. В целом, конечно, синтетическое тестирование позволяет оценить значение прогресса профессионального сообщества. Учитывая ключевые сценарии поведения, дальнейшее развитие различных форм деятельности напрямую зависит от форм воздействия. Безусловно, базовый вектор развития играет определяющее значение для соответствующих условий активизации. Современные технологии достигли такого уровня, что курс на социально-ориентированный национальный проект создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса стандартных подходов. Идейные соображения высшего порядка, а также граница обучения кадров, в своём классическом представлении, допускает внедрение существующих финансовых и административных условий. Элементы политического процесса, превозмогая сложившуюся непростую экономическую ситуацию, призваны к ответу. Ясность нашей позиции очевидна: базовый вектор развития не оставляет шанса для новых принципов формирования материально-технической и кадровой базы. Идейные соображения высшего порядка, а также перспективное планирование способствует подготовке и реализации поэтапного и последовательного развития общества. Банальные, но неопровержимые выводы, а также стремящиеся вытеснить традиционное производство, нанотехнологии формируют глобальную экономическую сеть и при этом - разоблачены.',
    imgs: ['/imgs/post1.jpg', '/imgs/post1-2.jpg', '/imgs/post1-3.jpg'],
    likes: [1, 2, 3, 4, 5, 9, 111, 1366, 233, 523],
    dislikes: [11, 34, 67, 33],
    commentsCount: 17,
    shareCount: 7
  },
];

const Home: NextPage = () => {
  const {refresh} = useRefresh();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <MainContainer activePage={2} title="Home">
      <section className={styles.homepage}>
        <section className={styles.news}>
          <SharePost/>
          <section className={styles.posts}>
            {fakePosts.map(post => {
              return (
                <Post key={post.id} post={post}/>
              )
            })}
          </section>
        </section>
        <HomeRightbar/>
      </section>
    </MainContainer>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const API_URL = 'http://localhost:7700';
  const result = await validateRefreshToken(API_URL+'/auth/refreshTokenValidate', req.cookies.refreshToken);
  if(!result){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {
    }
  };
};