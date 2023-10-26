import React, { useState } from 'react';
import styles from './Classifier.module.css';
import Layout from '../../Layout/Layout';
import { Select } from 'antd';

const { Option } = Select;

const featuresData = {
    'Один признак': {
        'Линии': {
            'Ретикулярные': {
                '1 цвет': {
                    'Коричневые, тонкие или толстые линии': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}},
                    'Чёрные': {'Простое лентиго': {}, 'Меланоцитарный невус': {}},
                },
                '>1 цвета': {
                    'Центральная гиперпигментация': {'Меланоцитарный невус': {}},
                    'Пестрый или краповый': {'Меланоцитарный невус': {}, 'Меланома': {}},
                    'Периферическая гиперпигментация': {'Меланоцитарный невус': {}, 'Меланома': {}},
                },
            },
            'Разветвленные': {
                'Коричневые': {'Меланоцитарный невус': {}},
                'Чёрные': {'Простое лентиго': {}},
            },
            'Параллельные': {
                'Гребешки': {
                    'Меланин': {'Меланома': {}, 'Меланоцитарный невус': {}},
                    'Другой пигмент': {'Кровотечение': {}, 'Экзогенный пигмент': {}},
                },
                'Борозды': {'Меланоцитарный невус': {}},
                'Пересекающиеся гребешки и борозды': {'Меланоцитарный невус': {}},
            },
            'Изогнутые': {'Себорейный кератоз': {}},
        },
        'Псевдоподии': {
            'Периферические': {'Меланоцитарный невус': {}},
            'Сегментарные': {'Меланома': {}},
        },
        'Круги': {
            'Только коричневые круги': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}},
            'Некоторые круги серые или чёрные': {'Меланома': {}, 'Себорейный кератоз': {}, 'Актинический кератоз (предрак)': {}},
        },
        'Глыбки': {
            '1 цвет': {
                'Красный или пурпурный': {'Гемангиома, кровоизлияние (в том числе пурпура)': {}},
                'Оранжевый': {'Себорейный кератоз': {}, 'Базальноклеточная карцинома': {}},
                'Желтый/белый': {'Себорейный кератоз': {}, 'Гиперплазия сальных желез': {}},
                'Телесный': {'Меланоцитарный невус': {}, 'Себорейный кератоз': {}},
                'Коричневый': {'Меланоцитарный невус': {}},
                'Черный': {'Гемангиома, тромбоз, геморрагия': {}},
                'Голубой': {'Базальноклеточная карцинома': {}},
            },
            '>1 цвета': {
                'Другой пигмент': {
                    'Преобладают белые, желтые или оранжевые глыбки': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}},
                    'Преобладают красные или сине-красные глыбки': {'Гемангиома': {}},
                },
                'Меланин': {
                    'Цвета расположены симметрично': {'Меланоцитарный невус': {}},
                    'Цвета расположены асимметрично': {'Меланоцитарный невус': {}, 'Базальноклеточная карцинома': {}, 'Меланома': {}},
                },
            },
        },
        'Точки': {
            'Серые точки': {'Себорейный кератоз (в форме доброкачественного лихеноидного кератоза)': {}, 'Актинический кератоз (предрак)': {}, 'Болезнь Боуэна (предрак)': {}, 'Меланома': {}},
            'Коричневые точки': {'Меланоцитарный невус': {}, 'Себорейный кератоз (в форме солнечного лентиго)': {}, 'Болезнь Боуэна (предрак)': {}},
        },
        'Бесструктурная область': {
            '1 цвет': {
                'Черный': {'Кровоизлияние': {}, 'Тромбированная гемангиома': {}, 'Меланоцитарный невус': {}, 'Меланома': {}},
                'Синий': {'Меланоцитарный невус': {}, 'Меланома': {}},
                'Коричневый': {'Себорейный кератоз': {}, 'Болезнь Боуэна (предрак)': {}, 'Меланоцитарный невус': {}},
                'Красный': {'Кровоизлияние': {}},
            },
            '>1 цвета': {
                'Преимущественно желтый или оранжевый': {'Базальноклеточная карцинома': {}, 'Себорейный кератоз': {}},
                'Преимущественно красный или черный': {'Кровоизлияние': {}},
                'Сочетания коричневого, синего, серого, черного': {
                    'Симметричная окраска': {'Меланоцитарный невус': {}},
                    'Несимметричная окраска': {'Меланома': {}, 'Болезнь Боуэна (предрак)': {}, 'Себорейный кератоз': {}, 'Базальноклеточная карцинома': {}, 'Дерматофиброма': {}},
                },
            },
        },
    },
    'Несколько признаков': {
        'Линии': {
            'Ретикулярные или разветвленные': {
                'Симметричные структуры': {'Меланоцитарный невус': {}},
                'Ассиметричные узоры': {
                    '1 цвет, коричневый': {'Меланоцитарный невус': {}},
                    '>1 цвета': {'Меланома': {}, 'Меланоцитарный невус': {}},
                },
            },
            'Параллельные': {
                'Гребешки': {
                    'Другой пигмент': {'Кровоизлияние': {}, 'Экзогенный пигмент': {}},
                    'Меланин': {
                        '1 цвет, коричневый': {'Меланома': {}, 'Меланоцитарный невус': {}, 'Простое лентиго': {}},
                        '>1 цвета': {'Меланома': {}},
                    },
                },
                'Борозды или пересекающие борозды и гребешки': {
                    'Симметричный': {'Меланоцитарный невус': {}},
                    'Асимметричный': {'Меланоцитарный невус': {}, 'Меланома': {}},
                },
            },
            'Радиальные': {
                'По краям': {
                    'Периферические': {
                        'Белый или светло-коричневый центр': {'Дерматофиброма': {}},
                        'Черный, коричневый или синий центр': {'Меланоцитарный невус': {}},
                    },
                    'Сегментарные': {'Меланома': {}, 'Базальноклеточная карцинома': {}},
                },
                'По центру': {'Базальноклеточная карцинома': {}},
            },
            'Изогнутые': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}, 'Меланома': {}},
        },
        'Псевдоподии': {
            'Периферические': {'Меланоцитарный невус': {}},
            'Сегментарные': {'Меланома': {}},
        },
        'Круги': {
            'Коричневые': {'Себорейный кератоз': {}, 'Меланоцитарный невус': {}},
            'Частично серые или чёрные': {'Меланома': {}, 'Себорейный кератоз': {}, 'Актинический кератоз (предрак)': {}},
        },
        'Глыбки': {
            'Симметричные узоры': {'Меланоцитарный невус': {}},
            'Ассиметричные узоры': {
                'Другой пигмент': {
                    'Жёлтый или белый': {'Себорейный кератоз': {}},
                    'Оранжевый': {'Базальноклеточная карцинома': {}, 'Себорейный кератоз': {}},
                    'Красный или пурпурный': {'Гемангиома': {}, 'Меланома': {}},
                },
                'Меланин': {
                    '1 цвет (коричневый)': {'Меланоцитарный невус': {}},
                    '>1 цвета': {'Базальноклеточная карцинома': {}, 'Меланома': {}, 'Себорейный кератоз': {}},
                },
            },
        },
        'Точки': {
            'Серые': {'Себорейный кератоз': {}, 'Актинический кератоз (предрак)': {}, 'Болезнь Боуэна (предрак)': {}, 'Меланома': {}, 'Базальноклеточная карцинома': {}},
            'Синие': {'Базальноклеточная карцинома': {}},
            'Черные': {'Меланома': {}, 'Меланоцитарный невус': {}},
            'Коричневые': {'Меланоцитарный невус': {}, 'Себорейный кератоз': {}, 'Болезнь Боуэна (предрак)': {}},
        },
    },
};


const FeatureSelector = ({ data, onSelect, depth, selectedFeatures }) => {
    const selectedFeature = selectedFeatures[depth];
    const handleFeatureChange = (value) => {
        onSelect(depth, value);
    };

    return (
        <div className={styles.featureSelector}>
            {Array.isArray(data) ? (
                data.length > 0 && (
                    <Select
                        style={{ width: 200 }}
                        placeholder="Выберите диагноз"
                        value={selectedFeature}
                        onChange={(value) => handleFeatureChange(value)}
                    >
                        {data.map((diagnosis, index) => (
                            <Option key={index} value={diagnosis}>
                                {diagnosis}
                            </Option>
                        ))}
                    </Select>
                )
            ) : (
                Object.keys(data).length > 0 && (
                    <div>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Выберите признак"
                            value={selectedFeature}
                            onChange={handleFeatureChange}
                        >
                            {Object.keys(data).map((feature) => (
                                <Option key={feature} value={feature}>
                                    {feature}
                                </Option>
                            ))}
                        </Select>
                        {selectedFeature && data[selectedFeature] && (
                            <FeatureSelector
                                data={data[selectedFeature]}
                                onSelect={onSelect}
                                depth={depth + 1}
                                selectedFeatures={selectedFeatures}
                            />
                        )}
                    </div>
                )
            )}
        </div>
    );
};




function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
}


function Classifier() {
    const [selectedFeatures, setSelectedFeatures] = useState([null, null, null, null]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [alert, setAlert] = useState(null);
    const [imageList, setImageList] = useState([]); // Список изображений
    const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Индекс выбранного изображения


    function addAlert(message, type) {
        setAlert({message, type});
    }


    function Alert({message, type}) {
        return (
            <div className={`${styles.alert} ${type === 'success' ? styles.success : ''}`}>
                {message}
            </div>
        );
    }

    const handleFeatureSelect = (depth, value) => {
        // Создаем новый массив для обновления состояния selectedFeatures
        const updatedSelectedFeatures = selectedFeatures.slice(0, depth + 1);
        updatedSelectedFeatures[depth] = value;

        // Обнуляем значения для всех select ниже
        for (let i = depth + 1; i < selectedFeatures.length; i++) {
            updatedSelectedFeatures[i] = null;
        }

        setSelectedFeatures(updatedSelectedFeatures);
    };


    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files); // Массив файлов
        const newImages = files.map((file) => ({
            src: URL.createObjectURL(file),
            name: file.name,
        }));
        setImageList([...imageList, ...newImages]);
    };

    const handleImageChange = (index) => {
        setSelectedImageIndex(index);
        setSelectedImage(imageList[index].src);
    };


    const handleFeatureRemove = (depth) => {
        const updatedSelectedFeatures = selectedFeatures.slice(0, depth);
        setSelectedFeatures(updatedSelectedFeatures);
    }

    const sendSelectedFeaturesToServer = () => {

        if (!selectedImage) {
            addAlert('Загрузите изображение перед отправкой на сервер', 'error');
            return; // Prevent further execution
        }

        if (selectedFeatures.length === 0) {
            addAlert('Выберите признаки во всех уровнях перед отправкой на сервер', 'error');
            return; // Prevent further execution
        }

        const isAllFeaturesSelected = (data, selectedFeatures, depth) => {
            if (depth >= selectedFeatures.length) {
                return true; // Прекращаем рекурсию, если depth больше или равно длине selectedFeatures
            }

            const currentFeature = selectedFeatures[depth];

            if (currentFeature === null || data[currentFeature] === undefined) {
                // Проверка на null или undefined, чтобы избежать ошибок
                return false;
            }

            if (depth === selectedFeatures.length - 1) {
                // Check if we are at the last depth
                return isEmpty(data[currentFeature]);
            } else {
                // Recursively check all levels
                return isAllFeaturesSelected(data[currentFeature], selectedFeatures, depth + 1);
            }
        };

        if (!isAllFeaturesSelected(featuresData, selectedFeatures, 0)) {
            addAlert('Выберите признаки во всех уровнях перед отправкой на сервер', 'error');
            return; // Prevent further execution
        }


// Полученный токен доступа
        const accessToken = localStorage.getItem('access_token');

        const selectedFeaturesData = {
            selectedFeatures,
            selectedImage: imageList[selectedImageIndex].name, // Отправляем имя файла
            accessToken: accessToken, // Включаем токен доступа в JSON
        };

        fetch('http://localhost:8000/receive-data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedFeaturesData),
        })
            .then((response) => {
                if (response.ok) {
                    addAlert('Данные успешно отправлены на сервер', 'success');
                } else {
                    addAlert('Ошибка при отправке данных на сервер, проверьте подключение к интернету', 'error');
                }
            })
            .catch((error) => {
                addAlert(`Произошла ошибка при отправке данных: ${error}`, 'error');
            });
    };


    return (
        <Layout>
            <main>
                <section className={styles.container}>
                    <div className={styles.imageSection}>
                        <h2>Список изображений:</h2>
                        <ul className={styles.imagesList}>
                            {imageList.map((image, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleImageChange(index)}
                                    className={selectedImageIndex === index ? styles.selected : ''}
                                >
                                    {image.name}
                                </li>
                            ))}
                        </ul>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className={styles.but}
                        />
                    </div>

                    <h2>Выбранное изображение:</h2>
                    <div className={styles.selectedImage}>
                        {selectedImage && (
                            <img src={selectedImage} alt="Selected Image" className={styles.melanoma} />
                        )}
                    </div>

                    <div className={styles.featureSection}>
                        <h2>Выберите признаки по Киттлеру:</h2>
                        <FeatureSelector
                            data={featuresData}
                            onSelect={handleFeatureSelect}
                            depth={0}
                            selectedFeatures={selectedFeatures}
                        />
                        <div className={styles.selectedFeatures}>
                            <h2>Выбранные признаки:</h2>
                            <ul className={styles.listContainer}>
                                {selectedFeatures.map((selected, depth) => (
                                    selected && (
                                        <li key={depth} className={styles.list}>
                                            {selected}
                                            <button onClick={() => handleFeatureRemove(depth)} className={styles.but}>
                                                Удалить
                                            </button>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>

                    <h2>Состояние запроса:</h2>

                    <ul className={styles.listContainer}>
                        {alert && <Alert message={alert.message} type={alert.type} />}
                    </ul>

                    <button onClick={sendSelectedFeaturesToServer} className={styles.but}>
                        Отправить на сервер
                    </button>
                </section>
            </main>
        </Layout>
    );
}

export default Classifier;