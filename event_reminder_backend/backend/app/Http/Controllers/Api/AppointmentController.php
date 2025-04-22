<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $sortBy = $request->query('sort_by', 'appointment_time');
        $sortDirection = $request->query('sort_direction', 'asc');
        $perPage = $request->query('per_page', 15);

        // Validate sort parameters
        $validSortColumns = ['appointment_time', 'created_at', 'title'];
        if (!in_array($sortBy, $validSortColumns)) {
            $sortBy = 'appointment_time';
        }
        if (!in_array($sortDirection, ['asc', 'desc'])) {
            $sortDirection = 'asc';
        }

        $appointments = $user->appointments()
                              ->orderBy($sortBy, $sortDirection)
                              ->paginate($perPage);

        return response()->json($appointments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'appointment_time' => 'required|date|after:now', // Ensure appointment is in the future
        ]);

        $appointment = $request->user()->appointments()->create([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'appointment_time' => Carbon::parse($validatedData['appointment_time']), // Ensure correct format
        ]);

        return response()->json($appointment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Appointment $appointment): JsonResponse
    {
        // Authorize: Ensure the appointment belongs to the authenticated user
        if ($request->user()->id !== $appointment->user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json($appointment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment): JsonResponse
    {
        // Authorize: Ensure the appointment belongs to the authenticated user
        if ($request->user()->id !== $appointment->user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'appointment_time' => 'required|date|after:now', // Ensure appointment is in the future
        ]);

        $appointment->update([
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'appointment_time' => Carbon::parse($validatedData['appointment_time']), // Ensure correct format
        ]);

        return response()->json($appointment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Appointment $appointment): JsonResponse
    {
        // Authorize: Ensure the appointment belongs to the authenticated user
        if ($request->user()->id !== $appointment->user_id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $appointment->delete();

        return response()->json(null, 204); // No Content
    }

    /**
     * Remove all overdue appointments for the current user.
     */
    public function destroyOverdue(Request $request): JsonResponse
    {
        $user = $request->user();
        $deletedCount = $user->appointments()
                             ->where('appointment_time', '<', now())
                             ->delete();

        return response()->json(['message' => "Successfully deleted {$deletedCount} overdue appointments."]);
    }
}
