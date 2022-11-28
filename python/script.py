import json
import matplotlib.pyplot as plt
import numpy


STEPS_NUMBER = 25_000_000
TRANSLATION_PERCENTAGE = 90


def interpolate(start, end):

    a_linear = (end["coord"]["y"] - start["coord"]["y"]) / (end["coord"]["x"] - start["coord"]["x"])
    b_linear = start["coord"]["y"] - a_linear * start["coord"]["x"]

    a_ellipse = STEPS_NUMBER
    b_ellipse = start["range"] - end["range"]

    output = []

    for index in range(STEPS_NUMBER):
        # INTERPOLATION FOR COORDINATES
        index_coordinates = min(100 * index / TRANSLATION_PERCENTAGE, STEPS_NUMBER - 1)
        x_coordinates = start["coord"]["x"] + index_coordinates * (end["coord"]["x"] - start["coord"]["x"]) \
            / (STEPS_NUMBER - 1)
        y_coordinates = a_linear * x_coordinates + b_linear

        # INTERPOLATION FOR RANGE
        altitude = b_ellipse * numpy.sqrt(1 - (index / a_ellipse) ** 2) + end["range"]

        output.append(
            {
                "coord": { "x": x_coordinates, "y": y_coordinates },
                "range": altitude,
            },
        )

    return output


if __name__ == "__main__":

    transform_start = {
        "coord": { "x": 2.351323, "y": 48.856712 },
        "range": 25E6,
    }
    transform_end = {
        "coord": { "x": 45.1345, "y": -12.8367 },
        "range": 110E3,
    }

    steps = interpolate(transform_start, transform_end)

    with open("steps.json", "w") as outfile:
        outfile.write(json.dumps(steps))

