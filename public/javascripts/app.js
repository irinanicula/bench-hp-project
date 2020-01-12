document.addEventListener("DOMContentLoaded", () => {
    const database = firebase.firestore();
    const myBooks = database.collection('books').doc('OZnwUf2OoRszoJivfslU');
    const nextButton = document.querySelector(".carousel__button--next");
    const prevButton = document.querySelector(".carousel__button--prev");
    const bookCollection = [];
    let carouselElementsArray;
    
    const fillBooksArray = () => {
        myBooks.onSnapshot(doc => {
            const data = doc.data();

            Object.values(data).forEach(value => {
                bookCollection.push(value);
            });

            generateBooks();
        });
    }

    // Function does more than the name suggests
    const createBookDiv = (book) => {
        const bookList = document.querySelector('.bookList-carousel');
        const bookDiv = document.createRange().createContextualFragment(
            `<div class="book">
                <h2 class="book__title">${book.title}</h2>
                <div class="book-content">
                    <div class="book-content__image">
                        <img src=${book.cover}>
                    </div>
                    <p class="book-content__summary">${book.summary}</p>
                <div>
            </div>`
        );

        bookList.append(bookDiv);
    }

    // Just reading the functrion name; what will it do?
    const generateBooks = () => {
        bookCollection.forEach(book => {
            createBookDiv(book);
        });

        document.querySelector(".book").classList.add("active");
        carouselElementsArray = Array.from(document.querySelectorAll(".book"));
    }






    const nextBook = () => {
        const activeElement = document.querySelector('.active');
        const currentIndex = carouselElementsArray.indexOf(activeElement);
        let targetElement;

        if(currentIndex === carouselElementsArray.length - 1) {
            targetElement = 0;
        } else {
            targetElement = currentIndex + 1;
        }

        updateActiveClasses(currentIndex, targetElement);
    }

    const updateActiveClasses = (currentIndex, targetElement) => {
        carouselElementsArray[currentIndex].classList.remove('active');
        carouselElementsArray[currentIndex].classList.add('next');

        carouselElementsArray[targetElement].classList.add('active');
        carouselElementsArray[targetElement].classList.remove('next');
    }

    nextButton.addEventListener('click', () => {
        nextBook();
    });

    fillBooksArray();
});

