import './App.css';
import SimpleCarousel from './components/SimpleCarousel';

function App() {
    const images = [
        'https://fastly.picsum.photos/id/700/200/300.jpg?hmac=4TJXw8Vm6U4zyESK_saOYwjHqg-_oKX8iRnUv_fkebQ',
        'https://fastly.picsum.photos/id/235/200/300.jpg?hmac=CYa1eIuRJqKgRcWJs37--g8W4vCLpTZI_NDWcIRcyvk',
        'https://fastly.picsum.photos/id/909/200/300.jpg?hmac=jfLbR2FxyVpJjZ0VrwZWiPNfvXlOEQxNdoCE2uu4qlM',
    ];
    return (
        <>
            <SimpleCarousel images={images} />
        </>
    );
}

export default App;
