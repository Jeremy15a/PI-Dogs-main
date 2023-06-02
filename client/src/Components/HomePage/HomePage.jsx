import style from './HomaPage.module.css'
import Cards from '../Cards/Cards'
import Side from '../Side/Side';
import NavBar from '../NavBar/NavBar'
import Pagination from '../Pagination/Pagination';

const HomePage= () => {

    return (
        <div className={style.super}>
            <header className={style.head}>
                <NavBar></NavBar>
                <button>Create a breed</button>
            </header>
            <aside className={style.side}>
                <Side></Side>
            </aside>
            <div className={style.body}> 
                <Cards></Cards>
            </div>
            <footer className={style.foot}>
                <Pagination></Pagination>
            </footer>
        </div>

)
};

export default HomePage




































































// const allDogs = useSelector((e) => e.allDogs); 
// const dogs = useSelector((e) => e.dogs);

// const [currentPage, setCurrentPage] = useState(1);
// const dogsPage = 8;
// const indexOfLastDogs = currentPage * dogsPage;
// const indexOfFirstDogs = indexOfLastDogs - dogsPage;

// const paginado = (pageNumber) => {
//   setCurrentPage(pageNumber);
// };
// useEffect(() => {
//   setCurrentPage(1);
// }, [dispatch]);

// const mostrarCards = (dogs) => {
//     const currentDogs = dogs.slice(indexOfFirstDogs, indexOfLastDogs);
//     return (
//       <div>
//         <div className="paginado2">
//           {currentDogs.length === 0 && currentDogs}
//           {currentDogs.map((e) => (
//             <div key={e.id}>
//               <Card
//                 name={e.name}
//                 image={e.image}
//                 temperament={e.temperament}
//                 weight={e.weight}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };